import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal, Signal } from "@angular/core";
import { User } from "../../core/models/user.model";
import { Store } from '@ngrx/store'
import { AppState } from "../../store/state/app.state";
import { selectError, selectFilteredUsers, selectLoading } from "../../store/selectors/user.selectors";
import { Router } from "@angular/router";
import * as UserActions from '../../store/actions/user.actions';
import { CardComponent } from "../../shared/components/card/card.component";
import { EmptyStateComponent, ErrorMessageComponent, LoadingSpinnerComponent, SearchInputComponent } from "../../shared";
import { ROUTE_PATHS } from "../../core";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
    SearchInputComponent,
    LoadingSpinnerComponent,
    ErrorMessageComponent,
    EmptyStateComponent
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {

  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  
  users: Signal<User[]> = this.store.selectSignal(selectFilteredUsers);
  loading: Signal<boolean> = this.store.selectSignal(selectLoading);
  error: Signal<any> = this.store.selectSignal(selectError);
  editingUserId = signal<number | null>(null);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.store.dispatch(UserActions.loadUsers());
  }

  onSearchChange(searchTerm: string): void {
    this.store.dispatch(UserActions.setSearchTerm({ searchTerm }));
  }

  onUserClick(user: User): void {
    this.router.navigate([`/${ROUTE_PATHS.USER_DETAIL.replace(':id', user.id.toString())}`]);
  }

  onUserEdit(user: User): void {
    this.store.dispatch(UserActions.updateUser({ user }));
  }

  onEditingStateChange(event: { userId: number; isEditing: boolean }): void {
    this.editingUserId.set(event.isEditing ? event.userId : null);
  }
    
}