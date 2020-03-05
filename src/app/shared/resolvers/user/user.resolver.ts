import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { IUserModel } from '../../../models';
import { AuthState } from '../../store/auth/auth.state';
import { GetUser } from '../../store/auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class UserResolver implements Resolve<IUserModel> {
  @Select(AuthState) public user$: Observable<IUserModel>;

  constructor(private store: Store) {}

  @Override()
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.dispatch(new GetUser()).pipe(
      switchMap(() => this.user$),
      take(1)
    );
  }
}
