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
  competences: any;
  competenceSubject = new Subject();
  deleteSubject = new Subject();
  verifValidationData = [];
  incrementation: any;
  
  
  constructor(
    private formBuilder: FormBuilder,
    private _portfolioService: PortfolioService,
    private _router: Router
  ) { }
  
  ngOnInit() {
    
    this.form = this.formBuilder.group({
      id: -1,
      title: "",
      type: null,
      createdDate: new Date(),
      modifiedDate: new Date(),
      path: ""
    })
    
    this._portfolioService.getData("competence")
    .subscribe(
      data => this.types = data
    )
    
    this._portfolioService.getData("competenceType")
    .subscribe(
      data => this.competences = data
    )
    
    // console.log(this.types)
    this._portfolioService.competenceSubject.subscribe(data => {
      this.competences = [...this.competences, data];
    });
    this._portfolioService.deleteSubject.subscribe(data => this.competences = data)    
  }
  
  createCompetence(competenceData) {
    
    this.form.reset();
    competenceData.createdDate = new Date();
    competenceData.modifiedDate = new Date();
    
    this._portfolioService.addData([{data: competenceData, contentType: "competence"}])
    .subscribe();

    return this.competenceSubject.next(competenceData);
  }
  
  deleteCompetenceData(competenceData){
    this.verifValidationData = [{data: competenceData, contentType: "competence"}]    
  }
  
}
