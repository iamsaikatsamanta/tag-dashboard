import { Component, OnInit } from '@angular/core';
import {AuthService} from '../Service/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
});
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.authService.onLogin(this.loginForm.getRawValue());
  }
}
