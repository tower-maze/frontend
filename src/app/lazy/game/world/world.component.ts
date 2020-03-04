import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { GetPlayer, GetMaze } from '../../../shared/store/game/game.actions';
import { IMazeModel, IPositionModel } from '../../../models';
import { Select, Store } from '@ngxs/store';
import { GameState } from '../../../shared/store/game/game.state';
import { Observable, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit, OnDestroy {
  private movementSubscription: Subscription;

  @ViewChild('maze', { static: true })
  private maze: ElementRef<HTMLCanvasElement>;

  @Select(GameState.getMazeState)
  public maze$: Observable<IMazeModel>;

  @Select(GameState.getPlayerPosition)
  public position$: Observable<IPositionModel>;

  constructor(private store: Store) {}

  @Override()
  public async ngOnInit() {
    await this.store.dispatch(new GetPlayer()).toPromise();
    await this.store.dispatch(new GetMaze()).toPromise();

    const mazeContext = this.maze.nativeElement.getContext('2d');
    const mazeData = await this.maze$.pipe(take(1)).toPromise();

    if (!mazeContext) throw new Error('Could not find maze');
    const sprites = new Image();
    sprites.src = 'assets/sprites.png';

    sprites.onload = () => {
      this.movementSubscription = this.position$.subscribe((playerPosition) => {
        this.drawMaze(playerPosition, mazeContext, mazeData, sprites);
      });
    };
  }

  @Override()
  public async ngOnDestroy() {
    this.movementSubscription?.unsubscribe();
  }

  private drawMaze(
    playerPosition: IPositionModel,
    mazeContext: CanvasRenderingContext2D,
    mazeData: IMazeModel,
    sprites: HTMLImageElement
  ) {
    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        const room = mazeData.rooms[y][x];
        const connectionCount = room.n + room.e + room.s + room.w;
        if (connectionCount === 1) {
          if (room.n)
            mazeContext.drawImage(sprites, 16 * 0, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.e)
            mazeContext.drawImage(sprites, 16 * 1, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.s)
            mazeContext.drawImage(sprites, 16 * 2, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.w)
            mazeContext.drawImage(sprites, 16 * 3, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
        }
        if (connectionCount === 2) {
          if (room.n && room.s)
            mazeContext.drawImage(sprites, 16 * 4, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.e && room.w)
            mazeContext.drawImage(sprites, 16 * 5, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.s && room.e)
            mazeContext.drawImage(sprites, 16 * 6, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.e && room.n)
            mazeContext.drawImage(sprites, 16 * 7, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.n && room.w)
            mazeContext.drawImage(sprites, 16 * 8, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.s && room.w)
            mazeContext.drawImage(sprites, 16 * 9, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
        }
        if (connectionCount === 3) {
          if (room.w && room.s && room.e)
            mazeContext.drawImage(sprites, 16 * 10, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.s && room.e && room.n)
            mazeContext.drawImage(sprites, 16 * 11, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.e && room.n && room.w)
            mazeContext.drawImage(sprites, 16 * 12, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
          if (room.n && room.w && room.s)
            mazeContext.drawImage(sprites, 16 * 13, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
        }
        if (connectionCount === 4) {
          mazeContext.drawImage(sprites, 16 * 14, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
        }
        if (room.id === mazeData.startRoom)
          mazeContext.drawImage(sprites, 16 * 15, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
        if (room.id === mazeData.exitRoom)
          mazeContext.drawImage(sprites, 16 * 16, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);

        if (playerPosition.x === x && playerPosition.y === y)
          mazeContext.drawImage(sprites, 16 * 17, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);
      }
    }
  }
}
