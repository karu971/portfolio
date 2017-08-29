import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

  BASE_URL = 'http://localhost:4201/auth';
  decodedToken = null;

  constructor(
    private _http: Http
  ) { }

  login(credentials) {
    console.log(`${this.BASE_URL}/login`);

    return this._http.post(`${this.BASE_URL}/login`, credentials)
      .map(res => res.json());
  }

  userIsLoggedIn() {
    return localStorage.getItem('log-data');
  }

  decodeTokenRole() {

    if (this.userIsLoggedIn()) {
      const getToken = JSON.parse(localStorage.getItem('log-data'));
      const getDecode = jwtDecode(getToken.token);
      if (getDecode.role == 'admin') {
        return true;
      }
    }
  }

  decodeTokenName() {

    if (this.userIsLoggedIn()) {
      const getToken = JSON.parse(localStorage.getItem('log-data'));
      const getDecode = jwtDecode(getToken.token);
      return getDecode.login;
    }
  }
  logOut() {
    localStorage.removeItem('log-data');
  }

}
