import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetMaze, GetPlayer } from './game.actions';
import { IGameModel, IMazeModel, IPositionModel } from '../../../models';
import { environment } from '../../../../environments/environment';

const defaults: IGameModel = {
  player: { x: -1, y: -1, maze: -1 },
  maze: { title: '', rooms: [] }
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

  @Action(GetMaze)
  public async getMaze({ getState, setState }: StateContext<IGameModel>) {
    const maze = await this.http
      .get<IMazeModel>(`${environment.apiURL}/api/adv/maze`)
      .toPromise();

    const state = getState();
    setState(GameState.setInstanceState({...state, maze }));
  }

  @Action(GetPlayer)
  public async getPlayer({ getState, setState }: StateContext<IGameModel>) {
    const player = await this.http
      .get<IPositionModel>(`${environment.apiURL}/api/adv/init`)
      .toPromise();

    const state = getState();
    setState(GameState.setInstanceState({ ...state, player }));
  }
}
