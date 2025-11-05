import { Component, inject, OnInit, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from '../../core/models/user.model';
import { AppState } from '../../store/state/app.state';
import { ROUTE_PARAMS, ROUTE_PATHS } from '../../core/constants/route.constants';
import * as UserActions from '../../store/actions/user.actions';
import { selectSelectedUser, selectLoading } from '../../store/selectors/user.selectors';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent implements OnInit {

  private readonly store = inject(Store<AppState>);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  user: Signal<User | null> = this.store.selectSignal(selectSelectedUser);
  loading: Signal<boolean> = this.store.selectSignal(selectLoading);

  userId: number = 0;


  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get(ROUTE_PARAMS.USER_ID));
    if (this.userId) {
      this.store.dispatch(UserActions.selectUser({ userId: this.userId }));
    }
  }

  goBack(): void {
    this.store.dispatch(UserActions.clearSelectedUser());
    this.router.navigate([`/${ROUTE_PATHS.HOME}`]);
  }
}
