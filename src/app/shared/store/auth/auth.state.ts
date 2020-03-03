import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Register, Login, GetUser, Logout } from './auth.actions';

import { IUserModel } from '../../../models';
import { environment } from '../../../../environments/environment';

const defaults: IUserModel = {
  pk: -1,
  username: '',
  email: '',
  first_name: '',
  last_name: ''
};

@State<IUserModel>({
  name: 'authState',
  defaults
})
@Injectable({ providedIn: 'root' })
export class AuthState {
  constructor(
    private readonly ngZone: NgZone,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  @Selector()
  public static getAuthData(state: IUserModel) {
    return AuthState.getInstanceState(state);
  }

  private static setInstanceState(state: IUserModel) {
    return { ...state };
  }

  private static getInstanceState(state: IUserModel) {
    return { ...state };
  }

  private navigate(url: string) {
    this.ngZone.run(() => this.router.navigateByUrl(url));
  }

  @Action(Login)
  public async login(ctx: StateContext<IUserModel>, { payload }: Login) {
    await this.http.post(`${environment.apiURL}/api/login/`, payload).toPromise();

    this.navigate('/game');
  }

  @Action(Register)
  public async register(ctx: StateContext<IUserModel>, { payload }: Register) {
    await this.http.post(`${environment.apiURL}/api/registration/`, payload).toPromise();
    this.navigate('/game');
  }

  @Action(GetUser)
  public async getUser({ setState }: StateContext<IUserModel>) {
    const user = await this.http.get<IUserModel>(`${environment.apiURL}/api/user/`).toPromise();
    setState(AuthState.setInstanceState(user));
  }

  @Action(Logout)
  public async logout({ setState }: StateContext<IUserModel>) {
    await this.http.post(`${environment.apiURL}/api/logout/`, {}).toPromise();
    setState(AuthState.setInstanceState(defaults));
    this.navigate('/');
  }
}
