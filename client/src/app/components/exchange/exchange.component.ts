import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.css']
})
export class ExchangeComponent implements OnInit
{
  form;
  price;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService)
  {
    // this.chatService.sendMessage();
  }

  sendMessage()
  {
    this.chatService.sendMessage();
  }

  ngOnInit()
  {
    this.chatService.getPrice().subscribe(message =>
    {
      this.price=message;
      console.log(this.price);

    });
  }

}
