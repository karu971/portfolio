import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: 'app-competence-type',
  templateUrl: './competence-type.component.html',
  styleUrls: ['./competence-type.component.css']
})
export class CompetenceTypeComponent implements OnInit {

  form: FormGroup;
  competenceTypes = [];
  alreadyExists: boolean = true;
  newType: boolean = false;


  constructor(private _portfolioService: PortfolioService, private _formBuilder: FormBuilder, private _router: Router) { }

  ngOnInit() {

    this.form = this._formBuilder.group({
      id: -1,
      title: ""

    });

    this._portfolioService.getTypeCompetence()
      .subscribe(
      data => this.competenceTypes = data
      );

    console.log("test: ", this.competenceTypes);

  }

  createCompetenceType(competenceTypeData) {
    this.alreadyExists = true;
    this.newType = true;

    for (var i = 0; i < this.competenceTypes.length; i++) {
      this.verifyIfAlreadyExists(i, competenceTypeData);
    }
    if (this.newType) {
      this.alreadyExists = true;
      this._portfolioService.addTypeCompetence(competenceTypeData)
        .subscribe();
      this._router.navigate(['/list-competences-informatique'])


    } else {
      this.alreadyExists = false;
      console.log(competenceTypeData);

    }


  }

  verifyIfAlreadyExists(i, competenceTypeData) {
    if (competenceTypeData.title == "" || competenceTypeData.title.trim().toLowerCase() === this.competenceTypes[i].title.trim().toLowerCase()) {
      this.newType = false
    }
  }
}


