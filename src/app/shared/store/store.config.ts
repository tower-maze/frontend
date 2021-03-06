import { NgxsConfig } from '@ngxs/store/src/symbols';
import { NgxsDevtoolsOptions } from '@ngxs/devtools-plugin/src/symbols';
import { NgxsLoggerPluginOptions } from '@ngxs/logger-plugin/src/symbols';

import { environment } from '../../../environments/environment';
import { AuthState } from './auth/auth.state';
import { ErrorState } from './error/error.state';
import { GameState } from './game/game.state';

export const STATES_MODULES = [AuthState, ErrorState, GameState];

export const OPTIONS_CONFIG: Partial<NgxsConfig> = {
  /**
   * Run in development mode. This will add additional debugging features:
   * - Object.freeze on the state and actions to guarantee immutability
   */
  developmentMode: !environment.production
};

export const DEVTOOLS_REDUX_CONFIG: NgxsDevtoolsOptions = {
  disabled: environment.production
};

export const LOGGER_CONFIG: NgxsLoggerPluginOptions = {
  disabled: environment.production
};
