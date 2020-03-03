import { ILoginModel, IRegisterModel } from '../../../models';

export class Login {
  public static readonly type = '[Auth] Login';

  constructor(public payload: ILoginModel) {}
}

export class Register {
  public static readonly type = '[Auth] Register';

  constructor(public payload: IRegisterModel) {}
}

export class GetUser {
  public static readonly type = '[Auth] GetUser';
}

export class Logout {
  public static readonly type = '[Auth] Logout';
}
