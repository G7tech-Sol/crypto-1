import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit
{
  objectKeys = Object.keys;
  cryptos : any;

  constructor(private authService:AuthService) { }

  ngOnInit()
  {
    this.authService.getprice().subscribe(res=>{
      this.cryptos = res;
      console.log(res);
    });
  }

}
