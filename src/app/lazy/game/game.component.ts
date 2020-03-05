import { Component, OnInit, OnDestroy } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Subscription, fromEvent } from 'rxjs';

import { Direction } from '../../models';
import { Logout } from '../../shared/store/auth/auth.actions';
import { MovePlayer } from 'src/app/shared/store/game/game.actions';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  private movementSubscription: Subscription;
  
  constructor() {}

  @Dispatch()
  public logout = () => new Logout();

  @Override()
  public ngOnInit() {
    this.movementSubscription = fromEvent<KeyboardEvent>(document, 'keydown').subscribe((event) => {
      switch (event.key) {
        case 'ArrowUp':
          this.movePlayer('n');
          break;
        case 'ArrowDown':
          this.movePlayer('s');
          break;
        case 'ArrowLeft':
          this.movePlayer('w');
          break;
        case 'ArrowRight':
          this.movePlayer('e');
          break;
        default:
          // ignore other keys
      }
    })
  }

  @Override()
  public ngOnDestroy() {
    this.movementSubscription.unsubscribe()
  }

  @Dispatch()
  public movePlayer = (direction: Direction) => new MovePlayer(direction);
}
