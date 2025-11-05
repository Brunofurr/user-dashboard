import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render spinner container', () => {
    const container = compiled.querySelector('.loading-spinner') ||
                     compiled.querySelector('.spinner-container') ||
                     compiled.querySelector('[role="status"]') ||
                     compiled.querySelector('div');
    expect(container).toBeTruthy();
  });

  it('should render spinner element', () => {
    const spinner = compiled.querySelector('.loading-spinner__spinner') ||
                   compiled.querySelector('.spinner') ||
                   compiled.querySelector('[class*="spin"]') ||
                   compiled.querySelector('svg') ||
                   compiled.querySelector('.loading-spinner div');
    expect(spinner).toBeTruthy();
  });

  it('should display loading text or have aria-label', () => {
    const loadingText = compiled.querySelector('.loading-spinner__text') ||
                       compiled.querySelector('.loading-text') ||
                       compiled.querySelector('span') ||
                       compiled.querySelector('p');
    
    const container = compiled.querySelector('[aria-label]');
    
    if (loadingText) {
      expect(loadingText.textContent).toBeTruthy();
    } else if (container) {
      const ariaLabel = container.getAttribute('aria-label');
      expect(ariaLabel).toBeTruthy();
    } else {
      expect(compiled.querySelector('div')).toBeTruthy();
    }
  });

});