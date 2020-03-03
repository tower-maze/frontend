import { Component, OnInit } from '@angular/core';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Logout } from '../../shared/store/auth/auth.actions';

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
}
