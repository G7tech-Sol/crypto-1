import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService
{
  private socket;
  options;
  domain = this.authService.domain;

  constructor(private authService: AuthService,private http: Http) { }

  createAuthenticationHeaders()
  {
    this.authService.loadToken();
    this.options = new RequestOptions(
    {
      headers: new Headers(
      {
        'Content-Type': 'application/json',
        'authorization': this.authService.authToken
      })
    });
  }

  sendMessage()
  {
    this.createAuthenticationHeaders();
    console.log(this.socket);
    this.socket.emit('add-message', this.options);
  }

  getPrice()
  {
    let observable = new Observable(observer => {
      this.socket = io(this.domain);
      this.socket.on('price', (data) => {
        console.log("tamator re alo");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
