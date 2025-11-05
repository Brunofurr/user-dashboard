import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from './store/state/app.state';
import { selectIsDarkMode } from './store/selectors/theme.selectors';
import * as ThemeActions from './store/actions/theme.actions';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'user-dashboard';
  isMobile = false;
  isDarkMode$: Observable<boolean>;
  isDarkMode = false;
  isSidebarOpen = false;

  constructor(private readonly store: Store<AppState>) {
    this.isDarkMode$ = this.store.select(selectIsDarkMode);
    this.checkScreenSize();
  }

  ngOnInit(): void {
    this.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
      document.body.classList.toggle('dark-theme', isDarkMode);
    });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  toggleTheme(): void {
    this.store.dispatch(ThemeActions.toggleTheme());
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  private checkScreenSize(): void {
    const previousMobile = this.isMobile;
    this.isMobile = window.innerWidth <= 768;

    if (this.isMobile && !previousMobile && this.isSidebarOpen) {
      this.isSidebarOpen = false;
    }
  }
}
