import { IMazeModel } from './maze.model';
import { IOtherModel } from './other.model';
import { IPositionModel } from './position.model';

export interface IGameModel {
  maze?: IMazeModel;
  others?: IOtherModel[];
  player?: IPositionModel;
}
