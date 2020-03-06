import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State, Action, Selector, StateContext, Store } from '@ngxs/store';
import { combineLatest } from 'rxjs';
import { pluck } from 'rxjs/operators';

import {
  GetMaze,
  GetPlayer,
  GetOtherPlayers,
  UpdateOtherPlayers,
  MovePlayer
} from './game.actions';
import { IGameModel, IMazeModel, IMoveModel, IOtherModel, IPositionModel } from '../../../models';
import { environment } from '../../../../environments/environment';
import { PusherService } from '../../services/pusher/pusher.service';

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
  constructor(private http: HttpClient, private pusher: PusherService, private store: Store) {
    combineLatest([
      this.store.select(GameState.getOtherPlayerPosition),
      this.pusher.getMovementChanges()
    ]).subscribe(([others, update]) => {
      const byLatest = (current: IOtherModel) =>
        current.player === update.player ? update : current;

      const changes = others?.map(byLatest);
      if (changes && JSON.stringify(others) !== JSON.stringify(changes))
        this.store.dispatch(new UpdateOtherPlayers(changes));
    });
  }

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
    if (JSON.stringify(state.others) !== JSON.stringify(others))
      setState(GameState.setInstanceState({ ...state, others }));
  }

  @Action(UpdateOtherPlayers)
  public async updateOtherPlayers(
    { getState, setState }: StateContext<IGameModel>,
    { payload }: UpdateOtherPlayers
  ) {
    const state = getState();
    setState(GameState.setInstanceState({ ...state, others: payload }));
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
