import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public get loggedIn() {
    return this.http
      .get(`${environment.apiURL}/api/authenticated/`)
      .pipe(pluck('authenticated'))
      .toPromise();
  }
}
