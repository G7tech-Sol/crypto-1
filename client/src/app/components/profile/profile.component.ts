import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit
{
  username;
  email;
  change=false;

  constructor(private authService:AuthService) { }

  changes()
  {
    this.change=true;
    console.log("hahaha");
  }

  changed()
  {
    this.change=false;
    console.log("huhuhu");
  }

  ngOnInit()
  {
    this.authService.getProfile().subscribe(profile=>
    {
      this.username= profile.user.username;
      this.email= profile.user.email;
    })
  }
}
