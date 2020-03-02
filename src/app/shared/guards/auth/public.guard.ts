import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
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
export class PublicGuard implements CanActivate {
  constructor(private router: Router) {}

  @Select(AuthState) public user$: Observable<IUserModel>;
  @Dispatch() public getUser = async () => new GetUser();

  @Override()
  public async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const getUser$ = from(this.getUser());
    const loggedIn = await getUser$
      .pipe(
        switchMap(() => this.user$.pipe(map((user) => user.pk))),
        map((id) => id > 0),
        take(2),
        skip(1)
      )
      .toPromise();

    return loggedIn ? this.router.parseUrl('/game') : true;
  }
}
