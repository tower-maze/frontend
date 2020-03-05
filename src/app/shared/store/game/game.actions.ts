import { Direction } from '../../../models';

export class GetMaze {
  public static readonly type = '[Game] GetMaze';
}

export class GetPlayer {
  public static readonly type = '[Game] GetPlayer';
}

export class GetOtherPlayers {
  public static readonly type = '[Game] GetOtherPlayers';
}

export class MovePlayer {
  public static readonly type = '[Auth] MovePlayer';
  constructor(public payload: Direction) {}
}