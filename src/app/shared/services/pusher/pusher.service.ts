import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Pusher from 'pusher-js';
import { IOtherModel } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private movement$: Subject<IOtherModel> = new Subject<IOtherModel>();
  private pusherClient = new Pusher('4e141243abf4aa14dd30', { cluster: 'us3' });

  constructor() {
    const channel = this.pusherClient.subscribe('Tower-Maze');
    channel.bind('movement', (movement: IOtherModel) => this.movement$.next(movement));
  }

  public getMovementChanges() {
    return this.movement$.asObservable();
  }
}
