import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CardComponent } from './card.component';
import { User } from '../../../core/models/user.model';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  const mockUser: User = {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
    address: {
      street: 'Main St',
      suite: 'Apt 1',
      city: 'City',
      zipcode: '12345',
      geo: { lat: '0', lng: '0' }
    },
    phone: '1234567890',
    website: 'john.com',
    company: {
      name: 'Company Inc',
      catchPhrase: 'Catch phrase',
      bs: 'BS'
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    expect(component.editForm).toBeDefined();
    expect(component.editForm.get('name')?.value).toBe('John Doe');
    expect(component.editForm.get('email')?.value).toBe('john@example.com');
    expect(component.editForm.get('company.name')?.value).toBe('Company Inc');
  });

  it('should display user information', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.card__title')?.textContent).toContain('John Doe');
    expect(compiled.querySelector('.card__email')?.textContent).toContain('john@example.com');
    expect(compiled.querySelector('.card__company')?.textContent).toContain('Company Inc');
  });

  it('should emit cardClick event when clicked in view mode', () => {
    spyOn(component.cardClick, 'emit');
    const cardView = fixture.nativeElement.querySelector('.card__view') as HTMLElement;
    cardView.click();
    expect(component.cardClick.emit).toHaveBeenCalledWith(mockUser);
  });

  it('should display edit button in view mode', () => {
    const editBtn = fixture.nativeElement.querySelector('.card__edit-btn');
    expect(editBtn).toBeTruthy();
  });

});