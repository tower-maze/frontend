import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService, CookieService]
})
export class ServicesModule {}
