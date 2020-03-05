import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { SetError } from '../../store/error/error.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  @Dispatch()
  private setError = (error: string) => new SetError(error);

  constructor() {}

  @Override()
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response) => {
        if (response.error instanceof Object && !response.error.movement) {
          const errors = Object.values(response.error).flat();
          this.setError(errors[0]);
        }
        throw response;
      })
    );
  }
}
