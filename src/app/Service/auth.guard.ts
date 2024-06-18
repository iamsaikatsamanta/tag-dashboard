import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import { AuthService } from '../Service/auth.service';



@Injectable()
export class AdminGuard implements CanActivate {
  private isUserAuth = false;
  constructor(private adminAuthService: AuthService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.isUserAuth = this.adminAuthService.getAuthStatus();
    if (!this.isUserAuth) {
      this.router.navigate(['/login']);
    }
    return this.isUserAuth;
  }
}

