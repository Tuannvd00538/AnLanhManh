import { Component, OnInit, Inject } from '@angular/core';
import axios from "axios";
import { Router } from "@angular/router";
import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(WINDOW) private window: Window, @Inject(LOCAL_STORAGE) private localStorage: any, 
    private router: Router,
  ) { }

  textError: any = null;
  public handleLogin: Function = async (account: any, password: any) => {
    const that = this;
    if (password.length == 0 || account.length == 0) {
      that.textError = "Please enter full infomation !";
    } else {
      that.textError = null;
      await axios.post('http://localhost:8080/api/auth/signin', {
        account: account,
        password: password
      }).then(function (response) {
        if (response.data.status == 200) {
          that.localStorage.setItem("token", response.data.accessToken);
          that.window.location.href = '/';
        }
      }).catch(function (error) {
        if (error.response.data.status == 401) {
          that.textError = error.response.data.message;
        } else {
          that.textError = null;
        }
      });
    }
  }

  ngOnInit() {
    var token: any = this.localStorage.getItem('token');
    if (token != null || token != undefined) {
      this.window.location.href = '/';
    }
  }

}

