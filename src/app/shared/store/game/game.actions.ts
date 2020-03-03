import { Direction } from '../../../models';

export class GetPlayer {
  public static readonly type = '[Game] GetPlayer';
}

export class MovePlayer {
  public static readonly type = '[Auth] MovePlayer';
  constructor(public payload: Direction) {}
}
