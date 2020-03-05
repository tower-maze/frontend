import { IPositionModel } from './position.model';

export type IOtherModel = Omit<IPositionModel, 'maze'>;
