import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import * as ThemeActions from './store/actions/theme.actions';
import { AppState } from './store/state/app.state';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let store: MockStore<AppState>;
  let dispatchSpy: jasmine.Spy;
  
  const initialState: AppState = {
    theme: { isDarkMode: false },
    users: { 
      users: [], 
      filteredUsers: [],
      loading: false, 
      error: null,
      searchTerm: '',
      selectedUser: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        CommonModule,
        RouterOutlet
      ],
      providers: [
        provideMockStore<AppState>({ initialState })
      ]
    })
    .overrideComponent(AppComponent, {
      set: {
        imports: [CommonModule, RouterOutlet],
        template: `
          <div class="app-container">
            <div class="sidebar-mock"></div>
            <main class="main-content" [class.sidebar-open]="isSidebarOpen">
              <router-outlet></router-outlet>
            </main>
          </div>
        `
      }
    })
    .compileComponents();

    store = TestBed.inject(MockStore) as MockStore<AppState>;
    dispatchSpy = spyOn(store, 'dispatch');
    
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toEqual('user-dashboard');
  });

  it('should initialize with default values', () => {
    expect(component.isMobile).toBe(false);
    expect(component.isDarkMode).toBe(false);
    expect(component.isSidebarOpen).toBe(false);
  });

  it('should subscribe to dark mode state on init', () => {
    store.setState({
      ...initialState,
      theme: { isDarkMode: true }
    });

    fixture.detectChanges();

    expect(component.isDarkMode).toBe(true);
    expect(document.body.classList.contains('dark-theme')).toBe(true);
  });

  it('should toggle theme when toggleTheme is called', () => {
    component.toggleTheme();
    
    expect(dispatchSpy).toHaveBeenCalledWith(ThemeActions.toggleTheme());
  });

  it('should toggle sidebar state', () => {
    expect(component.isSidebarOpen).toBe(false);
    
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBe(true);
    
    component.toggleSidebar();
    expect(component.isSidebarOpen).toBe(false);
  });

  it('should call checkScreenSize on component creation', () => {

    const innerWidth = window.innerWidth;
    expect(component.isMobile).toBe(innerWidth <= 768);
  });

  it('should detect mobile screen size correctly', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(768);
    component['checkScreenSize']();
    
    expect(component.isMobile).toBe(true);

    (Object.getOwnPropertyDescriptor(window, 'innerWidth')!.get as jasmine.Spy).and.returnValue(1024);
    component['checkScreenSize']();
    
    expect(component.isMobile).toBe(false);
  });

  it('should handle window resize event', () => {
    spyOn<any>(component, 'checkScreenSize');
    
    const event = new Event('resize');
    component.onResize(event);
    
    expect(component['checkScreenSize']).toHaveBeenCalled();
  });

  it('should close sidebar when switching from desktop to mobile with sidebar open', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1024);
    component['checkScreenSize']();
    component.isSidebarOpen = true;
    
    (Object.getOwnPropertyDescriptor(window, 'innerWidth')!.get as jasmine.Spy).and.returnValue(768);
    component['checkScreenSize']();
    
    expect(component.isMobile).toBe(true);
    expect(component.isSidebarOpen).toBe(false);
  });

  it('should not close sidebar when switching to mobile if sidebar was already closed', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(1024);
    component['checkScreenSize']();
    component.isSidebarOpen = false;
    
    (Object.getOwnPropertyDescriptor(window, 'innerWidth')!.get as jasmine.Spy).and.returnValue(768);
    component['checkScreenSize']();
    
    expect(component.isMobile).toBe(true);
    expect(component.isSidebarOpen).toBe(false);
  });

  it('should not affect sidebar when staying in mobile mode', () => {
    spyOnProperty(window, 'innerWidth').and.returnValue(600);
    component['checkScreenSize']();
    component.isSidebarOpen = true;
    
    (Object.getOwnPropertyDescriptor(window, 'innerWidth')!.get as jasmine.Spy).and.returnValue(700);
    component['checkScreenSize']();
    
    expect(component.isMobile).toBe(true);
    expect(component.isSidebarOpen).toBe(true);
  });

  it('should add sidebar-open class when sidebar is open', () => {
    component.isSidebarOpen = false;
    fixture.detectChanges();
    
    let mainContent = fixture.nativeElement.querySelector('.main-content');
    expect(mainContent.classList.contains('sidebar-open')).toBe(false);
    
    component.isSidebarOpen = true;
    fixture.detectChanges();
    
    expect(mainContent.classList.contains('sidebar-open')).toBe(true);
  });


  it('should select isDarkMode from store', () => {
    const isDarkMode$ = component.isDarkMode$;
    let emittedValue: boolean | undefined;
    
    isDarkMode$.subscribe(value => emittedValue = value);
    
    store.setState({
      ...initialState,
      theme: { isDarkMode: true }
    });
    
    expect(emittedValue).toBe(true);
  });

  describe('HostListener', () => {
    it('should have resize event listener', () => {
      spyOn(component, 'onResize');
      
      window.dispatchEvent(new Event('resize'));
      
      expect(component.onResize).toHaveBeenCalled();
    });
  });

  afterEach(() => {
    document.body.classList.remove('dark-theme');
  });
});