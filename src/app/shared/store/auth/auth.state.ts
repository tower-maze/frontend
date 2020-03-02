import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Register, Login, GetUser } from './auth.actions';

import { IUserModel } from '../../../models';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@State<IUserModel>({
  name: 'authState',
  defaults: {
    pk: -1,
    username: '',
    email: '',
    first_name: '',
    lass_name: ''
  }
})
@Injectable({ providedIn: 'root' })
export class AuthState {
  constructor(private ngZone: NgZone, private http: HttpClient, private router: Router) {}

  @Selector()
  public static getAuthData(state: IUserModel): IUserModel {
    return AuthState.getInstanceState(state);
  }

  private static setInstanceState(state: IUserModel): IUserModel {
    return { ...state };
  }

  private static getInstanceState(state: IUserModel): IUserModel {
    return { ...state };
  }

  private navigate(url: string) {
    this.ngZone.run(() => this.router.navigateByUrl(url));
  }

  @Action(Login)
  public async login(ctx: StateContext<IUserModel>, { payload }: Login) {
    try {
      await this.http
        .post(`${environment.apiURL}/api/login/`, payload, { withCredentials: true })
        .toPromise();
      this.navigate('/game');
    } catch (err) {
      console.log(err);
    }
  }

  @Action(Register)
  public async register(ctx: StateContext<IUserModel>, { payload }: Register) {
    try {
      await this.http
        .post(`${environment.apiURL}/api/registration/`, payload, {
          withCredentials: true
        })
        .toPromise();
      this.navigate('/game');
    } catch (err) {
      console.log(err);
    }
  }

  @Action(GetUser)
  public async getUser({ getState, setState }: StateContext<IUserModel>) {
    try {
      const user = await this.http
        .get<IUserModel>(`${environment.apiURL}/api/user/`, { withCredentials: true })
        .toPromise();
      setState(AuthState.setInstanceState(user));
    } catch (err) {
      setState(AuthState.setInstanceState({ ...getState(), pk: -2 }));
    }
  }
}
