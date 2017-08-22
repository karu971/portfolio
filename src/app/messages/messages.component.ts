import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  messageEror: string = "";
  messageSuccess: string = "";

  @Input() getMessage: any
  
  constructor() { }

  ngOnInit() {

    
  }

  // getMessageSuccess(message:string){
  //   this.messageSuccess = message;
  // }

  // getMessageError(message:string){
  //   this.messageEror = message;
  // }
}
