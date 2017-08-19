import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs/subject";

import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: 'app-competence-type',
  templateUrl: './competence-type.component.html',
  styleUrls: ['./competence-type.component.css']
})
export class CompetenceTypeComponent implements OnInit {
  
  form: FormGroup;
  competenceTypes: any;
  alreadyExists: boolean = true;
  newType: boolean = false;
  componentTypeSubject = new Subject();
  verifValidationData = [];
  
  
  constructor(private _portfolioService: PortfolioService, private _formBuilder: FormBuilder, private _router: Router) { }
  
  ngOnInit() {
    
    this.form = this._formBuilder.group({
      id: -1,
      title: ""
      
    });
    
    this._portfolioService.getData("competenceType")
    .subscribe(
      data => this.competenceTypes = data
    );
    
    this._portfolioService.competenceSubject.subscribe(
      data=> {
        this.competenceTypes = [...this.competenceTypes, data]
        console.log(data);
        
      }
    )
    this._portfolioService.deleteSubject.subscribe(data => this.competenceTypes = data)    

  }
  
  createCompetenceType(competenceTypeData) {
    this.alreadyExists = true;
    this.newType = true;
    
    for (var i = 0; i < this.competenceTypes.length; i++) {
      this.verifyIfAlreadyExists(i, competenceTypeData);
    }
    if (this.newType) {
      this.alreadyExists = true;
      this._portfolioService.addData([{data: competenceTypeData, contentType: "competenceType"}]    )
      .subscribe();
      
      
      
    } else {
      this.alreadyExists = false;      
    }
    this.form.reset();
    
  }
  
  verifyIfAlreadyExists(i, competenceTypeData) {
    if (competenceTypeData.title == "" || competenceTypeData.title.trim().toLowerCase() === this.competenceTypes[i].title.trim().toLowerCase()) {
      this.newType = false
    }
  }
    deleteCompetenceTypeData(competenceTypeData){
    this.verifValidationData = [{data: competenceTypeData, contentType: "competenceType"}]    
  }
}


