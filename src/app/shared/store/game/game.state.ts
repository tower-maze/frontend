import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetPlayer, MovePlayer } from './game.actions';
import { IGameModel, IPositionModel, IUpdatePositionModel } from '../../../models';
import { environment } from '../../../../environments/environment';

const defaults: IGameModel = {
  player: { x: -1, y: -1, maze: -1 },
  maze: []
};

@State<IGameModel>({
  name: 'game',
  defaults
})
@Injectable({ providedIn: 'root' })
export class GameState {
  constructor(private http: HttpClient) {}

  @Selector()
  public static getGameState(state: IGameModel) {
    return GameState.getInstanceState(state);
  }

  private static setInstanceState(state: IGameModel) {
    return { ...state };
  }

  private static getInstanceState(state: IGameModel) {
    return { ...state };
  }

  @Action(GetPlayer)
  public async getPlayer({ getState, setState }: StateContext<IGameModel>) {
    const player = await this.http
      .get<IPositionModel>(`${environment.apiURL}/api/adv/init`)
      .toPromise();

    const state = getState();
    setState(GameState.setInstanceState({ ...state, player }));
  }

  @Action(MovePlayer)
  public async movePlayer(
    { getState, setState }: StateContext<IGameModel>,
    { payload }: MovePlayer
  ) {
    const { x, y } = await this.http
      .post<IUpdatePositionModel>(`${environment.apiURL}/api/adv/move`, { direction: payload })
      .toPromise();

    const state = getState();
    setState(GameState.setInstanceState({ ...state, player: { ...state.player, x, y } }));
  }
}
