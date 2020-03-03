import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthInterceptor } from './auth/auth.interceptor';
import { ServicesModule } from '../services/services.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  imports: [CommonModule, ServicesModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class InterceptorModule {}
