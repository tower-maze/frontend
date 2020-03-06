import { IMazeModel } from './maze.model';
import { IOtherModel } from './other.model';
import { IPlayerModel } from './player.model';

export interface IGameModel {
  maze?: IMazeModel;
  others?: IOtherModel[];
  player?: IPlayerModel;
}
