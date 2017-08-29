import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  getName = '';

  constructor(
    private _authService: AuthService
  ) { }

  OnInit() {

    this.getName = this._authService.decodeTokenName();
    console.log(this.getName);


  }
  IsLoggedIn() {
    return this._authService.userIsLoggedIn();
  }

  userLogOut() {
    return this._authService.logOut();
  }

  decodeTokenRole() {
    return this._authService.decodeTokenRole();
  }
}
