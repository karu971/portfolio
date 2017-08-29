import { Component, OnInit } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-list-experience-professionnelle',
  templateUrl: './list-experience-professionnelle.component.html',
  styleUrls: ['./list-experience-professionnelle.component.scss']
})
export class ListExperienceProfessionnelleComponent implements OnInit {

  experiences: any = [];


  constructor(
    private _portfolioService: PortfolioService
  ) { }

  ngOnInit() {

    this._portfolioService.getData('experience')
    .subscribe(data => this.experiences = data);
  }


}
