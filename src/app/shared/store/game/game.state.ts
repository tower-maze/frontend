import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GetMaze, GetPlayer, MovePlayer } from './game.actions';
import { IGameModel, IMazeModel, IPositionModel } from '../../../models';
import { environment } from '../../../../environments/environment';

const defaults: IGameModel = {
  player: undefined,
  maze: undefined
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

  @Selector()
  public static getMazeState(state: IGameModel) {
    return GameState.getInstanceState(state).maze;
  }

  @Selector()
  public static getPlayerPosition(state: IGameModel) {
    return GameState.getInstanceState(state).player;
  }

  private static setInstanceState(state: IGameModel) {
    return { ...state };
  }

  private static getInstanceState(state: IGameModel) {
    return { ...state };
  }

  @Action(GetMaze)
  public async getMaze({ getState, setState }: StateContext<IGameModel>) {
    const maze = await this.http.get<IMazeModel>(`${environment.apiURL}/api/adv/maze`).toPromise();

    const state = getState();
    setState(GameState.setInstanceState({ ...state, maze }));
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
    const { maze, x, y } = await this.http
      .post<IPositionModel>(`${environment.apiURL}/api/adv/move`, { direction: payload })
      .toPromise();

    const state = getState();
    setState(
      GameState.setInstanceState({
        ...state,
        player: { ...state.player, maze, x, y }
      })
    );
  }
}
