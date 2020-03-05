import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest, interval } from 'rxjs';
import { SubSink } from 'subsink';

import { IMazeModel, IOtherModel, IPositionModel } from '../../../models';
import { GetPlayer, GetOtherPlayers, GetMaze } from '../../../shared/store/game/game.actions';
import { GameState } from '../../../shared/store/game/game.state';

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.scss']
})
export class WorldComponent implements OnInit, OnDestroy {
  private subscriptions = new SubSink();

  @ViewChild('maze', { static: true })
  private mazeCanvas: ElementRef<HTMLCanvasElement>;

  @ViewChild('players', { static: true })
  private playersCanvas: ElementRef<HTMLCanvasElement>;

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

    this.subscriptions.sink = combineLatest([interval(500), this.maze$]).subscribe(() =>
      this.store.dispatch(new GetOtherPlayers())
    );

    const mazeContext = this.mazeCanvas.nativeElement.getContext('2d');
    const playersContext = this.playersCanvas.nativeElement.getContext('2d');
    if (!mazeContext || !playersContext) throw new Error('Could not find maze');

    const sprites = new Image();
    sprites.src = 'assets/sprites.png';
    await sprites.decode();

    const triggers$ = combineLatest([this.maze$, this.position$, this.others$]);
    this.subscriptions.sink = triggers$.subscribe(this.drawPlayers(playersContext, sprites));
    this.subscriptions.sink = this.maze$.subscribe(this.drawMaze(mazeContext, sprites));
  }

  @Override()
  public async ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private getSprite(
    sprites: HTMLImageElement,
    sprite: number,
    x: number,
    y: number
  ): Parameters<CanvasRenderingContext2D['drawImage']> {
    return [sprites, 16 * sprite, 0, 16, 16, 16 * x, 16 * y, 16, 16];
  }

  private drawMaze = (context: CanvasRenderingContext2D, sprites: HTMLImageElement) => (
    mazeData: IMazeModel
  ) => {
    context.clearRect(0, 0, 512, 512);

    for (let y = 0; y < 32; y++) {
      for (let x = 0; x < 32; x++) {
        const room = mazeData.rooms[y][x];
        switch (room.n + room.e + room.s + room.w) {
          case 1:
            if (room.n) context.drawImage(...this.getSprite(sprites, 0, x, y));
            if (room.e) context.drawImage(...this.getSprite(sprites, 1, x, y));
            if (room.s) context.drawImage(...this.getSprite(sprites, 2, x, y));
            if (room.w) context.drawImage(...this.getSprite(sprites, 3, x, y));
            break;
          case 2:
            if (room.n && room.s) context.drawImage(...this.getSprite(sprites, 4, x, y));
            if (room.e && room.w) context.drawImage(...this.getSprite(sprites, 5, x, y));
            if (room.s && room.e) context.drawImage(...this.getSprite(sprites, 6, x, y));
            if (room.e && room.n) context.drawImage(...this.getSprite(sprites, 7, x, y));
            if (room.n && room.w) context.drawImage(...this.getSprite(sprites, 8, x, y));
            if (room.s && room.w) context.drawImage(...this.getSprite(sprites, 9, x, y));
            break;
          case 3:
            if (room.w && room.s && room.e) context.drawImage(...this.getSprite(sprites, 10, x, y));
            if (room.s && room.e && room.n) context.drawImage(...this.getSprite(sprites, 11, x, y));
            if (room.e && room.n && room.w) context.drawImage(...this.getSprite(sprites, 12, x, y));
            if (room.n && room.w && room.s) context.drawImage(...this.getSprite(sprites, 13, x, y));
            break;
          case 4:
            context.drawImage(...this.getSprite(sprites, 14, x, y));
            break;
        }
      }
    }
  };

  private drawPlayers = (context: CanvasRenderingContext2D, sprites: HTMLImageElement) => ([
    mazeData,
    playerPosition,
    others
  ]: [IMazeModel, IPositionModel, IOtherModel[]]) => {
    context.clearRect(0, 0, 512, 512);
    others.forEach((other) => context.drawImage(...this.getSprite(sprites, 18, other.x, other.y)));
    context.drawImage(...this.getSprite(sprites, 15, mazeData.startRoom.x, mazeData.startRoom.y));
    context.drawImage(...this.getSprite(sprites, 16, mazeData.exitRoom.x, mazeData.exitRoom.y));
    context.drawImage(...this.getSprite(sprites, 17, playerPosition.x, playerPosition.y));
  };
}
