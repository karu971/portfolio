import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PortfolioPage } from '../../../e2e/app.po';
import { PortfolioService } from '../services/portfolio.service';
import { MessagesComponent } from '../messages/messages.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _router:Router
  ) { }

  logData = null;
  isAuthenticated = false
  welcomeMessage = "";
  getMessage = { type: "", message: "" };


  ngOnInit() {
    if(this._authService.userIsLoggedIn()){
      this.refreshFlags();
    }
  }

  refreshFlags(){
    this.isAuthenticated = true;
    this.welcomeMessage = "Bienvenue";
  }

  login(formData) {
    this._authService.login(formData)
      .subscribe(
      data => this.handleLoginSucces(data),
      err => this.handleLoginError(err)
      )
  }

  handleLoginSucces(data) {
    console.log(data);
    if(data.success){
      this.logData = data;
      this.refreshFlags();
      localStorage.setItem('log-data', JSON.stringify(data));
      location.href="/home"      
    }
    
  }

  handleLoginError(err) {
    console.log('Failure', err);
  }

}

