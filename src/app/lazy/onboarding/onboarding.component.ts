import { Component, OnInit } from '@angular/core';
import { transition, trigger, useAnimation } from '@angular/animations';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { shake } from 'ng-animate';

import { ErrorState } from '../../shared/store/error/error.state';
import { AuthState } from '../../shared/store/auth/auth.state';

@Component({
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
  animations: [trigger('error', [transition('* => error', useAnimation(shake))])]
})
export class OnboardingComponent implements OnInit {
  @Select(AuthState.getLoading)
  public loading$: Observable<boolean>;

  @Select(ErrorState.getErrorState)
  public error$: Observable<string>;

  public selectedTab = 0;

  constructor() {}

  @Override()
  public ngOnInit() {}
}
