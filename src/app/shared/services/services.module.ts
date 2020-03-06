import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth/auth.service';
import { PusherService } from './pusher/pusher.service';

@NgModule({
  imports: [CommonModule],
  providers: [AuthService, PusherService]
})
export class ServicesModule {}
