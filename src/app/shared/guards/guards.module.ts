import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesModule } from '../services/services.module';

import { AuthGuard } from './auth/auth.guard';
import { PublicGuard } from './auth/public.guard';

@NgModule({
  imports: [CommonModule, ServicesModule],
  providers: [AuthGuard, PublicGuard]
})
export class GuardsModule {}
