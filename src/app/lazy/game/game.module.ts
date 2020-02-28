import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [GameComponent],
  imports: [CommonModule, MatCardModule, GameRoutingModule]
})
export class GameModule {}
