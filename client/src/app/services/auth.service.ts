import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService
{
  domain = "http://localhost:3000";
  authToken;
  user;
  options;
  result:any;

  constructor(private http: Http) { }

  createAuthenticationHeaders()
  {
    this.loadToken();
    this.options = new RequestOptions(
    {
      headers: new Headers({'Content-Type': 'application/json','authorization': this.authToken})
    });
  }
  
  loadToken()
  {
    this.authToken = localStorage.getItem('token');
  }

  getprice()
  {
    return this.http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ADA,ADX,AE,AION,AMB,APPC,ARK,ARN,ERC20,AST,BAT,BCC,BCD,BCPT,BLZ,BNB,BNT,BQX,ETH,XRP,XLM,IOT&tsyms=BTC,USD,EUR').map(result => this.result = result.json());
  }

  registerUser(user)
  {
    return this.http.post(this.domain + '/api/register', user).map(res => res.json());
  }

  checkUsername(username)
  {
    return this.http.get(this.domain + '/api/checkUsername/' + username).map(res => res.json());
  }

  checkEmail(email)
  {
    return this.http.get(this.domain + '/api/checkEmail/' + email).map(res => res.json());
  }

  login(user)
  {
    return this.http.post(this.domain + '/api/login', user).map(res => res.json());
  }

  logout()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  storeUserData(token, user)
  {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  getProfile()
  {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/api/profile', this.options).map(res => res.json());
  }
  getAddress()
  {
    this.createAuthenticationHeaders();
    return this.http.get(this.domain + '/api/address', this.options).map(res => res.json());
  }

  loggedIn()
  {
    return tokenNotExpired();
  }
}
