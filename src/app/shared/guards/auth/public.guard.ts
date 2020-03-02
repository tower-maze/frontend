import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PublicGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  @Override()
  public async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return (await this.auth.loggedIn) ? this.router.parseUrl('/game') : true;
  }
}
