import { IUserModel } from './user.model';

export interface IAuthModel {
  loading: boolean;
  user?: IUserModel;
}
