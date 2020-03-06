import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Pusher from 'pusher-js';

import { IOtherModel } from '../../../models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PusherService {
  private movement$: Subject<IOtherModel> = new Subject<IOtherModel>();
  private pusherClient = new Pusher(environment.pusherKey, { cluster: environment.pusherCluster });

  constructor() {
    const channel = this.pusherClient.subscribe(environment.pusherChannel);
    channel.bind('movement', (movement: IOtherModel) => this.movement$.next(movement));
  }

  public getMovementChanges() {
    return this.movement$.asObservable();
  }
}
