import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  image:string  = "assets/images/image1.jpg"
  
  constructor() {
   }

  ngOnInit() {
  }

}
