import { Component, OnInit } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

import { Direction } from '../../models';
import { Logout } from '../../shared/store/auth/auth.actions';
import { MovePlayer } from 'src/app/shared/store/game/game.actions';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  constructor() {}

  @Dispatch()
  public logout = () => new Logout();

  @Override()
  public ngOnInit() {}

  @Dispatch()
  public movePlayer = (direction: Direction) => new MovePlayer(direction);
}
