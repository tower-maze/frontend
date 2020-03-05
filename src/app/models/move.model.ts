import { IPositionModel } from './position.model';
import { IMazeModel } from './maze.model';

export interface IMoveModel {
  player: IPositionModel;
  nextMaze?: IMazeModel;
}
