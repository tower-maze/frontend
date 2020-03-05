import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { ErrorState } from '../../store/error/error.state';
import { SetError } from '../../store/error/error.actions';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {
  constructor(private snackBar: MatSnackBar) {}
  @Select(ErrorState.getErrorState)
  public error$: Observable<string>;

  private snackBarSubscription: Subscription;
  private dismissSubscription: Subscription;

  @Dispatch()
  public setError = (error: string) => new SetError(error);

  @Override()
  public ngOnInit() {
    this.snackBarSubscription = this.error$.pipe(filter((error) => !!error)).subscribe((error) => {
      this.dismissSubscription = this.snackBar
        .open(error, 'Close', {
          duration: 3000,
          panelClass: ['error-message']
        })
        .afterDismissed()
        .subscribe(() => this.setError(''));
    });
  }

  @Override()
  public ngOnDestroy() {
    this.snackBarSubscription.unsubscribe();
    this.dismissSubscription.unsubscribe();
  }
}
