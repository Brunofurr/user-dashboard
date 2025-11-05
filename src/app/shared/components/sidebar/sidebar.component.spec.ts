import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SidebarComponent } from './sidebar.component';
import { Component, Input, Output, EventEmitter, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  template: '<button (click)="onClick()">Theme</button>'
})
class MockThemeToggleComponent {
  @Input() isDarkMode = false;
  @Output() themeToggle = new EventEmitter<void>();
  
  onClick(): void {
    this.themeToggle.emit();
  }
}

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, RouterTestingModule],
      declarations: []
    })
    .overrideComponent(SidebarComponent, {
      set: {
        imports: [CommonModule, RouterTestingModule, MockThemeToggleComponent]
      }
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default input values', () => {
    expect(component.isDarkMode).toBe(false);
    expect(component.isOpen).toBe(true);
    expect(component.isMobile).toBe(false);
  });

  it('should accept input properties', () => {
    component.isDarkMode = true;
    component.isOpen = false;
    component.isMobile = true;
    
    expect(component.isDarkMode).toBe(true);
    expect(component.isOpen).toBe(false);
    expect(component.isMobile).toBe(true);
  });

  it('should emit toggleMenu event when toggleSidebar is called', () => {
    spyOn(component.toggleMenu, 'emit');
    
    component.toggleSidebar();
    
    expect(component.toggleMenu.emit).toHaveBeenCalled();
    expect(component.toggleMenu.emit).toHaveBeenCalledWith();
  });

  it('should emit themeChange event when onThemeChange is called', () => {
    spyOn(component.themeChange, 'emit');
    
    component.onThemeChange();
    
    expect(component.themeChange.emit).toHaveBeenCalled();
    expect(component.themeChange.emit).toHaveBeenCalledWith();
  });

  it('should maintain component state after multiple operations', () => {
    component.isDarkMode = true;
    component.isMobile = true;
    component.isOpen = false;
    
    component.toggleSidebar();
    component.onThemeChange();
    component.closeSidebar();
    
    expect(component.isDarkMode).toBe(true);
    expect(component.isMobile).toBe(true);
    expect(component.isOpen).toBe(false);
  });
});