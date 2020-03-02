import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { Register, Login, GetUser } from './auth.actions';

import { IUserModel } from '../../../models';
import { environment } from '../../../../environments/environment';

@State<IUserModel>({
  name: 'authStateModule',
  defaults: {
    pk: -1,
    username: '',
    email: '',
    first_name: '',
    lass_name: ''
  }
})
@Injectable({ providedIn: 'root' })
export class AuthStateModule {
  constructor(private http: HttpClient) {}

  @Selector()
  public static getAuthData(state: IUserModel): IUserModel {
    return AuthStateModule.getInstanceState(state);
  }

  private static setInstanceState(state: IUserModel): IUserModel {
    return { ...state };
  }

  private static getInstanceState(state: IUserModel): IUserModel {
    return { ...state };
  }

  @Action(Login)
  public async login({ dispatch }: StateContext<IUserModel>, { payload }: Login) {
    try {
      await this.http.post(`${environment.apiURL}/api/login/`, payload).toPromise();
      dispatch(new GetUser());
    } catch (err) {
      console.log(err);
    }
  }

  @Action(Register)
  public async register({ dispatch }: StateContext<IUserModel>, { payload }: Register) {
    try {
      await this.http.post(`${environment.apiURL}/api/registration/`, payload).toPromise();
      dispatch(new GetUser());
    } catch (err) {
      console.log(err);
    }
  }

  @Action(GetUser)
  public async getUser({ setState }: StateContext<IUserModel>) {
    const user = await this.http.get<IUserModel>(`${environment.apiURL}/api/user/`).toPromise();
    setState(AuthStateModule.setInstanceState(user));
  }
}
