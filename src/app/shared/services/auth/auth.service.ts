import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, pluck, take, catchError, map } from 'rxjs/operators';

import { Select, Store } from '@ngxs/store';

import { IUserModel } from '../../../models';
import { AuthState } from '../../store/auth/auth.state';
import { GetUser } from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Select(AuthState) public user$: Observable<IUserModel>;

  constructor(private store: Store) {}

  public get loggedIn() {
    return this.store
      .dispatch(new GetUser())
      .pipe(
        switchMap(() => this.user$),
        pluck('pk'),
        take(1),
        catchError(() => of(-1)),
        map((pk) => pk > 0)
      )
      .toPromise();
  }
}
