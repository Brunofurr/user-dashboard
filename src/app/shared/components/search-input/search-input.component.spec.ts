import { ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input.component';

describe('SearchInputComponent', () => {
  let component: SearchInputComponent;
  let fixture: ComponentFixture<SearchInputComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInputComponent, ReactiveFormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchInputComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search control', () => {
    expect(component.searchControl.value).toBe('');
  });

  it('should emit search term after debounce time', fakeAsync(() => {
    let emittedValue: string | undefined;
    component.searchChange.subscribe(value => emittedValue = value);
    
    component.searchControl.setValue('test');

    tick(200);
    expect(emittedValue).toBeUndefined();

    tick(100);
    expect(emittedValue).toBe('test');
    
    flush();
  }));

  it('should not emit duplicate consecutive values', fakeAsync(() => {
    const emittedValues: string[] = [];
    component.searchChange.subscribe(value => emittedValues.push(value));

    component.searchControl.setValue('test');
    tick(300);
    component.searchControl.setValue('test');
    tick(300);

    expect(emittedValues.length).toBe(1);
    expect(emittedValues[0]).toBe('test');
    
    flush();
  }));

  it('should emit different consecutive values', fakeAsync(() => {
    const emittedValues: string[] = [];
    component.searchChange.subscribe(value => emittedValues.push(value));

    component.searchControl.setValue('test1');
    tick(300);
    component.searchControl.setValue('test2');
    tick(300);

    expect(emittedValues.length).toBe(2);
    expect(emittedValues[0]).toBe('test1');
    expect(emittedValues[1]).toBe('test2');
    
    flush();
  }));

});