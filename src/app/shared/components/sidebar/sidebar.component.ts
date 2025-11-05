import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ThemeToggleComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isDarkMode = false;
  @Input() isOpen = true;
  @Input() isMobile = false;
  @Output() themeChange = new EventEmitter<void>();
  @Output() toggleMenu = new EventEmitter<void>();

  toggleSidebar(): void {
    this.toggleMenu.emit();
  }

  closeSidebar(): void {
    if (this.isMobile && this.isOpen) {
      this.toggleMenu.emit();
    }
  }

  onThemeChange(): void {
    this.themeChange.emit();
  }
}
