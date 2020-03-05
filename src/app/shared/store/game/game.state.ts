import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State, Action, Selector, StateContext } from '@ngxs/store';
import { pluck } from 'rxjs/operators';

import { GetMaze, GetPlayer, GetOtherPlayers, MovePlayer } from './game.actions';
import { IGameModel, IMazeModel, IMoveModel, IOtherModel, IPositionModel } from '../../../models';
import { environment } from '../../../../environments/environment';

const defaults: IGameModel = {
  player: undefined,
  maze: undefined,
  others: undefined
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

  @Selector()
  public static getOtherPlayerPosition(state: IGameModel) {
    return GameState.getInstanceState(state).others;
  }

  private static setInstanceState(state: IGameModel) {
    return { ...state };
  }

  private static getInstanceState(state: IGameModel) {
    return { ...state };
  }

  @Action(GetMaze)
  public async getMaze({ getState, setState }: StateContext<IGameModel>) {
    const maze = await this.http.get<IMazeModel>(`${environment.apiURL}/api/adv/maze/`).toPromise();

    const state = getState();
    setState(GameState.setInstanceState({ ...state, maze }));
  }

  @Action(GetPlayer)
  public async getPlayer({ getState, setState }: StateContext<IGameModel>) {
    const player = await this.http
      .get<IPositionModel>(`${environment.apiURL}/api/adv/init/`)
      .toPromise();

    const state = getState();
    setState(GameState.setInstanceState({ ...state, player }));
  }

  @Action(GetOtherPlayers)
  public async getOtherPlayers({ getState, setState }: StateContext<IGameModel>) {
    const others = await this.http
      .get<{ others: IOtherModel[] }>(`${environment.apiURL}/api/adv/others/`)
      .pipe(pluck('others'))
      .toPromise();

    const state = getState();
    if (others.join(',') === state.others?.join(',')) return;
    setState(GameState.setInstanceState({ ...state, others }));
  }

  @Action(MovePlayer)
  public async movePlayer(
    { getState, setState }: StateContext<IGameModel>,
    { payload }: MovePlayer
  ) {
    const { player, nextMaze } = await this.http
      .post<IMoveModel>(`${environment.apiURL}/api/adv/move/`, { direction: payload })
      .toPromise();

    const state = getState();
    setState(
      GameState.setInstanceState({
        ...state,
        maze: nextMaze || state.maze,
        player: { ...state.player, ...player }
      })
    );
  }
}
