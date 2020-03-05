import { Injectable } from '@angular/core';

import { Action, Selector, State, StateContext } from '@ngxs/store';

import { IErrorModel } from '../../../models';
import { SetError } from './error.actions';

@State<IErrorModel>({
  name: 'error',
  defaults: { message: undefined }
})
@Injectable({ providedIn: 'root' })
export class ErrorState {
  constructor() {}

  @Selector()
  public static getErrorState(state: IErrorModel) {
    return ErrorState.getInstanceState(state)?.message;
  }

  private static setInstanceState(state: IErrorModel) {
    return state;
  }

  private static getInstanceState(state: IErrorModel) {
    return state;
  }

  @Action(SetError)
  public async setError({ setState, getState }: StateContext<IErrorModel>, { payload }: SetError) {
    setState(ErrorState.setInstanceState({ ...getState(), message: payload }));
  }
}
