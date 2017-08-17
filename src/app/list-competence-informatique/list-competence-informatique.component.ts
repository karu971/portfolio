import { Component, OnInit } from '@angular/core';
import { PortfolioService } from "../services/portfolio.service";
import { FormGroup, FormBuilder } from "@angular/forms";


@Component({
  selector: 'app-list-competence-informatique',
  templateUrl: './list-competence-informatique.component.html',
  styleUrls: ['./list-competence-informatique.component.css']
})
export class ListCompetenceInformatiqueComponent implements OnInit {

  competences = [];
  typeCompetences = [];

  constructor(private _formBuilder: FormBuilder, private _portfolioService: PortfolioService) { }

  ngOnInit() {


    this._portfolioService.getCompetence()
      .subscribe(
      data => this.competences = data,
      error => console.error
      )
    this._portfolioService.competenceSubject.subscribe(
      data => {
        console.log(data);
        this.competences = [data, ...this.competences];
      }
    )
    this._portfolioService.getTypeCompetence()
      .subscribe(
      data => this.typeCompetences = data,
      error => console.error
      )

  }

}
