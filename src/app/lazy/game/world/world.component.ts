import { Component, OnInit } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

import { GetPlayer, GetMaze } from '../../../shared/store/game/game.actions';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit {
  constructor() {}

  @Override()
  public ngOnInit() {
    this.getPlayerPosition();
    this.getMaze();
  }

  @Dispatch()
  public getMaze = () => new GetMaze();

  @Dispatch()
  public getPlayerPosition = () => new GetPlayer();
}
