import { Direction, IOtherModel } from '../../../models';

export class GetMaze {
  public static readonly type = '[Game] GetMaze';
}

export class GetPlayer {
  public static readonly type = '[Game] GetPlayer';
}

export class GetOtherPlayers {
  public static readonly type = '[Game] GetOtherPlayers';
}

export class UpdateOtherPlayers {
  public static readonly type = '[Game] UpdateOtherPlayers';
  constructor(public payload: IOtherModel[]) {}
}

export class MovePlayer {
  public static readonly type = '[Auth] MovePlayer';
  constructor(public payload: Direction) {}
}
