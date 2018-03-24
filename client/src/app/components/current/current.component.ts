import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit
{
  connectionMessage;

  constructor(private chatService: ChatService)
  {}

  sendMessage()
  {
    this.chatService.sendMessage();
  }

  ngOnInit()
  {
    this.chatService.getPrice().subscribe(message =>
    {
      console.log(message);
    });
  }

}
