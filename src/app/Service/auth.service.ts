import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import {RESTAPI} from '../models/RESTAPI';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;
  adminToken = null;
  adminLoginStatus = false;
  private tokenTimer: any;
  adminLoginListner = new Subject<boolean>();
  constructor(private http: HttpClient, private router: Router,  private toaster: ToastrService) {}
  onLogin(data) {
    this.http.post<RESTAPI>(this.apiUrl + 'login', data)
      .subscribe(resp => {
        if (resp.code === 0) {
          this.adminToken = resp.result;
          if (this.adminToken) {
            this.saveAuthData(this.adminToken);
            this.adminLoginStatus = true;
            this.adminLoginListner.next(true);
            this.router.navigate(['/category']);
            this.toaster.success('You Have Login Successfully');
          }
        } else if (resp.code === 4) {
          this.toaster.error(resp.messege);
        }
      }, err => {
        this.toaster.error('Something Went Wrong');
      });
  }
  private setAuthTimer(duration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
  async autoAuthAdmin() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    this.adminToken = authInfo.token;
    this.adminLoginStatus = true;
    this.adminLoginListner.next(true);
    // this.router.navigate(['/category']);
  }
  logout() {
    this.adminToken = null;
    this.adminLoginStatus = false;
    this.adminLoginListner.next(false);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }
  getAuthStatus() {
    return this.adminLoginStatus;
  }
  private clearAuthData() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminExpiration');
  }
  private async saveAuthData(token: string) {
    localStorage.setItem('adminToken', token);
  }
  getAdminAuthStatusListner() {
    return this.adminLoginListner.asObservable();
  }
  getAdminToken() {
    return this.adminToken;
  }
  private getAuthData() {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      return;
    }
    return {
      token,
    };
  }
}
