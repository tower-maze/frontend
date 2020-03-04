import { IRoomModel } from './room.model';

export interface IMazeModel {
  title: string;
  rooms: IRoomModel[][];
  startRoom: number;
  exitRoom: number;
}
