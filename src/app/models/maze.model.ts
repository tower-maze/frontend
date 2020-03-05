import { IKeyRoomModel } from './key-room.model';
import { IRoomModel } from './room.model';

export interface IMazeModel {
  title: string;
  rooms: IRoomModel[][];
  startRoom: IKeyRoomModel;
  exitRoom: IKeyRoomModel;
}
