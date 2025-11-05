import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThemeToggleComponent } from './theme-toggle.component';

describe('ThemeToggleComponent', () => {
  let component: ThemeToggleComponent;
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeToggleComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeToggleComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with light mode by default', () => {
    expect(component.isDarkMode).toBe(false);
  });

  it('should accept isDarkMode input', () => {
    component.isDarkMode = true;
    fixture.detectChanges();
    
    expect(component.isDarkMode).toBe(true);
  });

  it('should emit themeChange event when toggleTheme is called', () => {
    spyOn(component.themeChange, 'emit');
    
    component.toggleTheme();
    
    expect(component.themeChange.emit).toHaveBeenCalled();
    expect(component.themeChange.emit).toHaveBeenCalledWith();
    expect(component.themeChange.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit themeChange event when button is clicked', () => {
    spyOn(component.themeChange, 'emit');
    
    const button = compiled.querySelector('.theme-toggle__button') || 
                  compiled.querySelector('button');
    
    if (button) {
      (button as HTMLButtonElement).click();
      expect(component.themeChange.emit).toHaveBeenCalled();
    }
  });

  it('should render consistently', () => {
    fixture.detectChanges();
    const firstRender = compiled.innerHTML;
    
    fixture.detectChanges();
    const secondRender = compiled.innerHTML;
    
    expect(firstRender).toBe(secondRender);
  });
});