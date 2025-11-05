import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent {
  @Input() isDarkMode = false;
  @Output() themeChange = new EventEmitter<void>();

  toggleTheme(): void {
    this.themeChange.emit();
  }
}
