import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

declare var ccc:any;

@Injectable()
export class SocketService
{
  private socket;
  options;
  domain = 'https://streamer.cryptocompare.com/';
  currentPrice = {};


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

  getCurrent()
  {
    this.createAuthenticationHeaders();
    this.socket = io(this.domain);
    console.log(this.socket);
    var subscription = ['5~CCCAGG~BTC~USD', '5~CCCAGG~ETH~USD'];
	  this.socket.emit('SubAdd', { subs: subscription });
	  this.socket.on("m", function(message)
    {
  		var messageType = message.substring(0, message.indexOf("~"));
  		var res = {};
      console.log(message);
  		if (messageType == ccc.CCC.STATIC.TYPE.CURRENTAGG)
      {
  			res = ccc.CCC.CURRENT.unpack(message);
  			console.log(res);
  		}
  	});
  }

  getMessages()
  {
    let observable = new Observable(observer => {
      this.socket = io(this.domain);
      this.socket.on('message', (data) => {
        console.log("alo re alo");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }
}
