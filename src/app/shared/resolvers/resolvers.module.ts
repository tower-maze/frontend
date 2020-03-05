import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserResolver } from './user/user.resolver';

@NgModule({
  imports: [CommonModule],
  providers: [UserResolver]
})
export class ResolversModule {}
