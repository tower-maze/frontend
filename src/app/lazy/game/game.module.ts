import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule} from '@angular/material/icon';

import { GameRoutingModule } from './game-routing.module';
import { GameComponent } from './game.component';
import { WorldComponent } from './world/world.component';

@NgModule({
  declarations: [GameComponent, WorldComponent],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, GameRoutingModule]
})
export class GameModule {}