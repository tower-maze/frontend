import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription, combineLatest, interval } from 'rxjs';
import { take } from 'rxjs/operators';

import { IMazeModel, IOtherModel, IPositionModel } from '../../../models';
import { GetPlayer, GetOtherPlayers, GetMaze } from '../../../shared/store/game/game.actions';
import { GameState } from '../../../shared/store/game/game.state';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit, OnDestroy {
  private movementSubscription: Subscription;
  private updateSubscription: Subscription;

  @ViewChild('maze', { static: true })
  private maze: ElementRef<HTMLCanvasElement>;

  @Select(GameState.getMazeState)
  public maze$: Observable<IMazeModel>;

  @Select(GameState.getPlayerPosition)
  public position$: Observable<IPositionModel>;

  @Select(GameState.getOtherPlayerPosition)
  public others$: Observable<IOtherModel[]>;

  constructor(private store: Store) {}

  @Override()
  public async ngOnInit() {
    const actions = [new GetPlayer(), new GetOtherPlayers(), new GetMaze()];
    const promises = actions.map((action) => this.store.dispatch(action).toPromise());
    await Promise.all(promises);

    this.updateSubscription = interval(100).subscribe(() =>
      this.store.dispatch(new GetOtherPlayers())
    );

    const mazeContext = this.maze.nativeElement.getContext('2d');
    const mazeData = await this.maze$.pipe(take(1)).toPromise();

    if (!mazeContext) throw new Error('Could not find maze');
    const sprites = new Image();
    sprites.src = 'assets/sprites.png';

    sprites.onload = () => {
      const triggers$ = combineLatest(this.position$, this.others$);

      this.movementSubscription = triggers$.subscribe(([playerPosition, others]) => {
        this.drawMaze(playerPosition, others, mazeContext, mazeData, sprites);
      });
    };
  }

  @Override()
  public async ngOnDestroy() {
    this.movementSubscription?.unsubscribe();
    this.updateSubscription?.unsubscribe();
  }

  private drawMaze(
    playerPosition: IPositionModel,
    others: IOtherModel[],
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
        if (connectionCount === 4)
          mazeContext.drawImage(sprites, 16 * 14, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);

        if (others.some((otherPosition) => otherPosition.x === x && otherPosition.y === y))
          mazeContext.drawImage(sprites, 16 * 18, 0, 16, 16, 16 * x, 16 * (31 - y), 16, 16);

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
