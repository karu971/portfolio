import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from 'rxjs/Subject';
import { Router } from "@angular/router";


import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: 'app-competence-informatique-form',
  templateUrl: './competence-informatique-form.component.html',
  styleUrls: ['./competence-informatique-form.component.css']
})
export class CompetenceInformatiqueFormComponent implements OnInit {

  form: FormGroup;
  types = [];
  competences = [];


  constructor(private formBuilder: FormBuilder, private _portfolioService: PortfolioService, private _router: Router) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: -1,
      title: "",
      type: null,
      createdDate: new Date(),
      modifiedDate: new Date(),
      path:""
    })

    this._portfolioService.getTypeCompetence()
      .subscribe(
      data => this.types = data
      )
   
      this._portfolioService.getCompetence()
      .subscribe(
      data => this.competences = data
      )

    // console.log(this.types)
  }

  createCompetence(competenceData) {    
    this._portfolioService.addCompetence(competenceData)
      .subscribe();
    this._router.navigate(['/list-competences-informatique'])

  }

}
