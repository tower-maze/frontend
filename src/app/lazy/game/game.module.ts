import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { WorldComponent } from './world/world.component';

@NgModule({
  declarations: [GameComponent, WorldComponent],
  imports: [CommonModule, MatCardModule, GameRoutingModule]
})
export class GameModule {}
