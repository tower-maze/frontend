import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, switchMap, take, skip } from 'rxjs/operators';

import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';

import { IUserModel } from '../../../models';
import { AuthState } from '../../store/auth/auth.state';
import { GetUser } from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Select(AuthState) public user$: Observable<IUserModel>;
  @Dispatch() public getUser = async () => new GetUser();

  constructor() {}

  public get loggedIn() {
    const getUser$ = from(this.getUser());
    return getUser$
      .pipe(
        switchMap(() => this.user$.pipe(map((user) => user.pk))),
        map((id) => id > 0),
        take(2),
        skip(1)
      )
      .toPromise();
  }
}
