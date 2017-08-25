import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: 'app-list-etudes-formations',
  templateUrl: './list-etudes-formations.component.html',
  styleUrls: ['./list-etudes-formations.component.css']
})

export class ListEtudesFormationsComponent implements OnInit {

  @Input() gridCol: string = "col-sm-12";
  @Input() fontSize: string = "";
  
  formations: any= [];

  constructor(
    private _porfolioService: PortfolioService
  ) { }

  ngOnInit() {
    this._porfolioService.getData("formation")
    .subscribe(
      data => this.formations = data
    )
  }

}
