import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsDispatchPluginModule } from '@ngxs-labs/dispatch-decorator';

import {
  DEVTOOLS_REDUX_CONFIG,
  LOGGER_CONFIG,
  OPTIONS_CONFIG,
  STATES_MODULES
} from './store.config';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgxsModule.forRoot(STATES_MODULES, OPTIONS_CONFIG),
    NgxsReduxDevtoolsPluginModule.forRoot(DEVTOOLS_REDUX_CONFIG),
    NgxsLoggerPluginModule.forRoot(LOGGER_CONFIG),
    NgxsDispatchPluginModule.forRoot()
  ],
  exports: [NgxsModule]
})
export class StoreModule {}