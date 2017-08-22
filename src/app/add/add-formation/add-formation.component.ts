import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MessagesComponent } from "../../messages/messages.component";


import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.css']
})
export class AddFormationComponent implements OnInit {

  form: FormGroup;
  formations: any = [];
  titleContenu: string = "Ajouter une nouvelle formation"
  ajouteFormation: boolean = true;
  pre: any;
  getMessage = { type: "", message: "" };



  constructor(
    private _formBuilder: FormBuilder,
    private _portfolioService: PortfolioService,
    private _messagesComponent: MessagesComponent
  ) { }

  ngOnInit() {



    this.form = this._formBuilder.group({
      id: -1,
      title: "TITLE TEST",
      body: "BODY TEST",
      annee: "2015",
      createdDate: new Date(),
      modifiedDate: new Date(),
    })
    this._portfolioService.getData("formation")
      .subscribe(data => {
        this.formations = data
      })

    this._portfolioService.competenceSubject.subscribe(data => {
      console.log(data);

      this.formations = [...this.formations, data]
      this.pre = data
    });
    this._portfolioService.editSubject.subscribe(data => this.formations = data);
    this._portfolioService.deleteSubject.subscribe(data => this.formations = data)

  }

  editFormationData(formationData) {
    this.titleContenu = "Modifier la formation: ";
    this.ajouteFormation = false;
    this.form = this._formBuilder.group({
      id: formationData.id,
      title: formationData.title,
      body: formationData.body,
      annee: formationData.annee,
      createdDate: formationData.createdDate,
      modifiedDate: formationData.modifiedDate,
    });
  }

  resetFormationData() {
    this.titleContenu = "Ajouter une nouvelle formation";
    this.form.reset();
    this._portfolioService.getData("formation")
      .subscribe(data => {
        this.formations = data
      })
    this.ajouteFormation = true;
  }


  submitFormation(formationData) {
    if (this.ajouteFormation) {
      this.form.reset();
      this._portfolioService.addData([{ data: formationData, contentType: "formation" }])
        .subscribe(data => this.getMessage = { type: "success", message: "La nouvelle formation a été ajouté avec succèss" });
    } else {
      this._portfolioService.editData([{ data: formationData, contentType: "formation" }])
        .subscribe(data => this.getMessage = { type: "success", message: "La nouvelle formation a été modifié avec succèss" });
    }
  }

  deleteFormationData(deleteData) {
    this.form.reset();
    this._portfolioService.deleteData([{ data: deleteData, contentType: "formation" }])
      .subscribe();
  }

}
