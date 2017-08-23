import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MessagesComponent } from "../../messages/messages.component";


import { PortfolioService } from "../../services/portfolio.service";


@Component({
  selector: 'app-add-langues',
  templateUrl: './add-langues.component.html',
  styleUrls: ['./add-langues.component.css']
})
export class AddLanguesComponent implements OnInit {

  form: FormGroup;
  langues: any = [];
  titleContenu: string = "Ajouter une nouvelle langue"
  ajouterLangue: boolean = true;
  pre: any;
  getMessage = { type: "", message: "" };
  verifValidationData: any = [];



  constructor(
    private _formBuilder: FormBuilder,
    private _portfolioService: PortfolioService,
    private _messagesComponent: MessagesComponent
  ) { }

  ngOnInit() {



    this.form = this._formBuilder.group({
      id: -1,
      title: "",
      body: "",
      createdDate: new Date(),
      modifiedDate: new Date(),
    })
    this._portfolioService.getData("langue")
      .subscribe(data => {
        this.langues = data
      })

    this._portfolioService.competenceSubject.subscribe(data => {
      console.log(data);

      this.langues = [...this.langues, data]
      this.pre = data
    });
    this._portfolioService.editSubject.subscribe(data => this.langues = data);
    this._portfolioService.deleteSubject.subscribe(data => this.langues = data)

  }

  editLangueData(langueData) {
    console.log(langueData);

    this.titleContenu = "Modifier la langue: ";
    this.ajouterLangue = false;
    this.form = this._formBuilder.group({
      id: langueData.id,
      title: langueData.title,
      body: langueData.body,
      createdDate: langueData.createdDate,
      modifiedDate: langueData.modifiedDate,
    });
  }

  resetLangueData() {
    this.titleContenu = "Ajouter une nouvelle langue";
    this.form.reset();
    this._portfolioService.getData("langue")
      .subscribe(data => {
        this.langues = data
      })
    this.ajouterLangue = true;
  }


  submitLangue(langueData) {
    if (this.ajouterLangue) {
      this.form.reset();
      this._portfolioService.addData([{ data: langueData, contentType: "langue" }])
        .subscribe(data => this.getMessage = { type: "success", message: "La nouvelle langue a été ajouté avec succèss" });
    } else {
      this._portfolioService.editData([{ data: langueData, contentType: "langue" }])
        .subscribe(data => this.getMessage = { type: "success", message: "La nouvelle langue a été modifié avec succèss" });
    }
  }

  deleteLangueData(deleteData) {
    this.form.reset();
    this.verifValidationData = [{ data: deleteData, contentType: "langue" }]
  }

}
