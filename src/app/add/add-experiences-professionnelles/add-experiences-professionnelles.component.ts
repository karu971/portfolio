import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { MessagesComponent } from "../../messages/messages.component";


import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: 'app-add-experiences-professionnelles',
  templateUrl: './add-experiences-professionnelles.component.html',
  styleUrls: ['./add-experiences-professionnelles.component.css']
})
export class AddExperiencesProfessionnellesComponent implements OnInit {

  form: FormGroup;
  experiences: any = [];
  titleContenu: string = "Ajouter une nouvelle experience"
  ajouteExperience: boolean = true;
  pre: any;
  getMessage = { type: "", message: "" };
  competences: any = []
  competencesArray: any = [];
  verifValidationData: any = [];


  constructor(
    private _formBuilder: FormBuilder,
    private _portfolioService: PortfolioService,
    private _messagesComponent: MessagesComponent
  ) { }

  ngOnInit() {
    // window['CKEDITOR']['replace']( 'body' );


    this.form = this._formBuilder.group({
      id: -1,
      title: "",
      body: "",
      date: "",
      company: "",
      lieu: "",
      competence: [],
      createdDate: new Date(),
      modifiedDate: new Date(),
    })
    this._portfolioService.getData("experience")
      .subscribe(data => {
        this.experiences = data
      })

    this._portfolioService.competenceSubject.subscribe(data => {
      this.experiences = [...this.experiences, data]
      this.pre = data
    });

    this._portfolioService.getData("competence")
      .subscribe(data => this.competences = data)

    this._portfolioService.editSubject.subscribe(data => this.experiences = data);
    this._portfolioService.deleteSubject.subscribe(data => this.experiences = data)

  }

  editExperienceData(experienceData) {

    this.titleContenu = "Modifier la experience: ";
    this.ajouteExperience = false;
    this.form = this._formBuilder.group({
      id: experienceData.id,
      title: experienceData.title,
      body: experienceData.body,
      date: experienceData.date,
      company: experienceData.company,
      lieu: experienceData.lieu,
      competence: [],
      createdDate: experienceData.createdDate,
      modifiedDate: experienceData.modifiedDate,
    });

    console.log(experienceData.competence);

    for (let item of this.competences) {
      if (experienceData.competence.findIndex(x => x.id == item.id) === -1) {
        experienceData.competence = [...experienceData.competence, item]
      }


    }

    this.competences = experienceData.competence
  }

  resetExperienceData() {
    this.titleContenu = "Ajouter une nouvelle experience";
    this.form.reset();
    this._portfolioService.getData("experience")
      .subscribe(data => {
        this.experiences = data
      })
    this.ajouteExperience = true;
  }


  submitExperience(experienceData) {
    this.form.reset();
    if (this.ajouteExperience) {
      experienceData.competence = this.competences
      this._portfolioService.addData([{ data: experienceData, contentType: "experience" }])
        .subscribe(data => this.getMessage = { type: "success", message: "La nouvelle experience a été ajouté avec succèss" });
    } else {
      console.log(this.form.value);
      experienceData.competence = this.competences
      this._portfolioService.editData([{ data: experienceData, contentType: "experience" }])
        .subscribe(data => this.getMessage = { type: "success", message: "La nouvelle experience a été modifié avec succèss" });
    }
  }

  deleteExperienceData(deleteData) {
    this.form.reset();
    this.verifValidationData = [{ data: deleteData, contentType: "experience" }]
  }

  onChange($event) {
    $event.checked == true ? $event.checked = false : $event.checked = true;
    console.log($event);

  }

}
