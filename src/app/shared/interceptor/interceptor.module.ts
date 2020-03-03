import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthInterceptor } from './auth/auth.interceptor';
import { ServicesModule } from '../services/services.module';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

@NgModule({
  imports: [CommonModule, ServicesModule],
  providers: [httpInterceptorProviders]
})
export class InterceptorModule {}
