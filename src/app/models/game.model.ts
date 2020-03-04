import { IMazeModel } from './maze.model';
import { IPositionModel } from './position.model';

export interface IGameModel {
  player?: IPositionModel;
  maze?: IMazeModel;
}
