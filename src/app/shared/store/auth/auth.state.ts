import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { forkJoin, timer } from 'rxjs';
import { first } from 'rxjs/operators';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { IAuthModel } from '../../../models';
import { environment } from '../../../../environments/environment';
import { Register, Login, GetUser, Logout } from './auth.actions';

@State<IAuthModel>({
  name: 'auth',
  defaults: {
    loading: false,
    user: undefined
  }
})
@Injectable({ providedIn: 'root' })
export class AuthState {
  constructor(
    private readonly ngZone: NgZone,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  @Selector()
  public static getAuthData(state: IAuthModel) {
    return AuthState.getInstanceState(state);
  }

  @Selector()
  public static getLoading(state: IAuthModel) {
    return AuthState.getInstanceState(state).loading;
  }

  @Selector()
  public static getUserData(state: IAuthModel) {
    return AuthState.getInstanceState(state).user;
  }

  private static setInstanceState(state: IAuthModel) {
    return { ...state };
  }

  private static getInstanceState(state: IAuthModel) {
    return { ...state };
  }

  private navigate(url: string) {
    this.ngZone.run(() => this.router.navigateByUrl(url));
  }

  @Action(Login)
  public async login({ getState, setState }: StateContext<IAuthModel>, { payload }: Login) {
    try {
      setState({ ...getState(), loading: true });
      const request = this.http.post(`${environment.apiURL}/api/login/`, payload);
      await forkJoin([request, timer(500)])
        .pipe(first())
        .toPromise();
      this.navigate('/game');
    } catch (err) {
      setState({ ...getState(), loading: false });
      throw err;
    }
  }

  @Action(Register)
  public async register({ getState, setState }: StateContext<IAuthModel>, { payload }: Register) {
    try {
      setState({ ...getState(), loading: true });
      const request = this.http.post(`${environment.apiURL}/api/registration/`, payload);
      await forkJoin([request, timer(500)])
        .pipe(first())
        .toPromise();
      this.navigate('/game');
    } catch (err) {
      setState({ ...getState(), loading: false });
      throw err;
    }
  }

  @Action(GetUser)
  public async getUser({ getState, setState }: StateContext<IAuthModel>) {
    try {
      setState({ ...getState(), loading: true });
      const user = await this.http.get<IAuthModel>(`${environment.apiURL}/api/user/`).toPromise();
      setState(AuthState.setInstanceState(user));
    } finally {
      setState({ ...getState(), loading: false });
    }
  }

  @Action(Logout)
  public async logout({ getState, setState }: StateContext<IAuthModel>) {
    try {
      setState({ ...getState(), loading: true });
      await this.http.post(`${environment.apiURL}/api/logout/`, {}).toPromise();
      setState(AuthState.setInstanceState({ loading: false, user: undefined }));
      this.navigate('/');
    } finally {
      setState({ ...getState(), loading: false });
    }
  }
}
