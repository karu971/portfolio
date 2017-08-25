import { Component, OnInit } from '@angular/core';
import { PortfolioService } from "../services/portfolio.service";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  experiences: any = [];
  competences: any = [];
  langues: any = [];
  image: string = "assets/images/image1.jpg"

  constructor(
    private _portfolioService: PortfolioService
  ) {
  }

  ngOnInit() {
    this._portfolioService.getData("experience")
      .subscribe(data => this.experiences = data)

    this._portfolioService.getData("competence")
      .subscribe(data => this.competences = data)

    this._portfolioService.getData("langue")
      .subscribe(data => this.langues = data)
  }
  getImage(data) {
    return this._portfolioService.getImage(data)
  }
}
