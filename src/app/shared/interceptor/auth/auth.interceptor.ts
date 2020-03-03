import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly cookies: CookieService) {}

  @Override()
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const CSRFtoken = this.cookies.get('csrftoken');
    const authReq = request.clone({
      headers: request.headers.set('X-CSRFTOKEN', CSRFtoken),
      withCredentials: true
    });

    return next.handle(authReq);
  }
}
