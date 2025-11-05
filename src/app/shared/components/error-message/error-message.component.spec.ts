import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMessageComponent } from './error-message.component';

describe('ErrorMessageComponent', () => {
  let component: ErrorMessageComponent;
  let fixture: ComponentFixture<ErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMessageComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.message).toBe('Ocorreu um erro');
    expect(component.showRetry).toBe(true);
    expect(component.retryText).toBe('Tentar novamente');
  });

  it('should display default error message', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const messageElement = compiled.querySelector('.error-message__text') || 
                          compiled.querySelector('.error-message p') ||
                          compiled.querySelector('p');
    expect(messageElement?.textContent).toContain('Ocorreu um erro');
  });

  it('should display custom error message', () => {
    component.message = 'Erro personalizado ao carregar dados';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const messageElement = compiled.querySelector('.error-message__text') || 
                          compiled.querySelector('.error-message p') ||
                          compiled.querySelector('p');
    expect(messageElement?.textContent).toContain('Erro personalizado ao carregar dados');
  });

  it('should update message when input changes', () => {
    const newMessage = 'Servidor indisponível';
    component.message = newMessage;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const messageElement = compiled.querySelector('.error-message__text') || 
                          compiled.querySelector('.error-message p') ||
                          compiled.querySelector('p');
    expect(messageElement?.textContent).toContain(newMessage);
  });

  it('should maintain component state after emit', () => {
    component.retry.emit();
    
    expect(component.message).toBe('Ocorreu um erro');
    expect(component.showRetry).toBe(true);
    expect(component.retryText).toBe('Tentar novamente');
  });
});