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
  competenceTypes: any;
  alreadyExists: boolean = true;
  newType: boolean = false;
  verifValidationData = [];
  titleContent: string = "Ajouter un nouveau type de compétence informatique";
  ajouteTypeCompetence = true;
  getMessage = { type: "", message: "" };


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
      data => {
        this.competenceTypes = [...this.competenceTypes, data]
        console.log(data);

      }
    )
    this._portfolioService.editSubject.subscribe(data => this.competenceTypes = data)
    this._portfolioService.deleteSubject.subscribe(data => this.competenceTypes = data)

  }

 
  verifyIfAlreadyExists(i, competenceTypeData) {
    if (competenceTypeData.title == "" || competenceTypeData.title.trim().toLowerCase() === this.competenceTypes[i].title.trim().toLowerCase()) {
      this.newType = false
    }
  }
  deleteCompetenceTypeData(competenceTypeData) {
    this.verifValidationData = [{ data: competenceTypeData, contentType: "competenceType" }]
  }

  editFormationData(typeData) {
    this.titleContent = "Modifier le type de compétence informatique";
    this.ajouteTypeCompetence = false
    this.form = this._formBuilder.group({
      id: typeData.id,
      title: typeData.title,
      body: typeData.body,
      annee: typeData.annee,
      createdDate: typeData.createdDate,
      modifiedDate: typeData.modifiedDate,
    });
  }

  resetFormationData() {
    this.form.reset();
    this.titleContent = "Ajouter un nouveau type de compétence";

  }

  submitcompetenceType(competenceType) {

    if (this.ajouteTypeCompetence) {

      this.form.reset();
      this._portfolioService.addData([{ data: competenceType, contentType: "competenceType" }])
        .subscribe(data => this.getMessage = { type: "success", message: "La nouvelle formation a été ajouté avec succèss" });
    } else {

      this._portfolioService.editData([{ data: competenceType, contentType: "competenceType" }])
        .subscribe(data => this.getMessage = { type: "success", message: "La nouvelle formation a été modifié avec succèss" });
    }
  }

}


