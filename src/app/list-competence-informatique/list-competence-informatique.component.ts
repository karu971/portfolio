import { Component, OnInit } from '@angular/core';
import { PortfolioService } from "../services/portfolio.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PopUpComponent } from "../pop-up/pop-up.component";


@Component({
  selector: 'app-list-competence-informatique',
  templateUrl: './list-competence-informatique.component.html',
  styleUrls: ['./list-competence-informatique.component.css']
})
export class ListCompetenceInformatiqueComponent implements OnInit {

  competences: any;
  typeCompetences = [];
  verifValidationData = [];
  

  constructor(
    private _formBuilder: FormBuilder, 
    private _portfolioService: PortfolioService,
  private _popUpComponent: PopUpComponent) { }

  ngOnInit() {

    console.log(this);


    this._portfolioService.getData('competence')
      .subscribe(
      data => this.competences = data,
      error => console.error
      )
    this._portfolioService.getData('competenceType')
      .subscribe(
      data => this.typeCompetences = data,
      error => console.error
      )
    this._portfolioService.deleteSubject.subscribe(data => this.competences = data)    

  }

  deleteItem(competenceData){    
    this.verifValidationData = [{data: competenceData, contentType: 'competence'}]
  }

}
