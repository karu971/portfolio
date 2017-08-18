import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PortfolioService } from "../../services/portfolio.service";

import { Feature } from "../../feature";


@Component({
  selector: 'app-competence-informatique',
  templateUrl: './competence-informatique.component.html',
  styleUrls: ['./competence-informatique.component.css']
})
export class CompetenceInformatiqueComponent implements OnInit {
  
  componentDetails = [];
  errorMessage = "";
  error = null;
  types = [];
  form: FormGroup;
  messageSuccess = true
  
  constructor(
    private _formBuilder: FormBuilder, 
    private _route: ActivatedRoute, 
    private _portfolioService: PortfolioService, 
    private _router: Router,
    private _feature: Feature,
    
  ) { }
  
  ngOnInit() {
    this.form = this._formBuilder.group({
      id: -1,
      title: "",
      type: null,
      createdDate: new Date(),
      modifiedDate: new Date(),
      path: ""
    })
    
    const id = this._route.snapshot.params.id;
    
    this._portfolioService.getCompetenceById(id)
    .subscribe(
      
      data => {
        this.handleServerResponse(data);
      },
      error => {
        this.handleError(error);
      }
    )
    this._portfolioService.getTypeCompetence()
    .subscribe(
      data => this.types = data
    )
    
    
  }
  handleServerResponse(response) {
    if (response.success) {
      this.componentDetails = response.dataCompetence;
      this.form = this._formBuilder.group({
        id: response.dataCompetence.id,
        title: response.dataCompetence.title,
        type: parseInt(response.dataCompetence.type),
        createdDate: response.dataCompetence.createdDate,
        modifiedDate: new Date(),
        path: response.dataCompetence.path
        
      });
      this._feature.getNewUrl(response.dataCompetence.title);
      
    } else {
      this._router.navigate(['**'])
    }
  }
  handleError(error) {
    console.log('handleError ', error.message);
    this.error = error;
  }
  editCompetence(editCompetence) {
    
    if (editCompetence.path == "" || editCompetence.path == null) {
      let newUrl = this._feature.getNewUrl(editCompetence.title);
      console.log(newUrl)
      
      editCompetence.path = `/competence-informatique/${newUrl}`;
    }
    this._portfolioService.editComponent(editCompetence)
    .subscribe();
    this.messageSuccess = false;
    
  }
  
}
