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
      this._portfolioService.getData("experience")
        .subscribe(data => {
          this.experiences = data
        })
  
      this._portfolioService.competenceSubject.subscribe(data => {
        console.log(data);
  
        this.experiences = [...this.experiences, data]
        this.pre = data
      });
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
        annee: experienceData.annee,
        createdDate: experienceData.createdDate,
        modifiedDate: experienceData.modifiedDate,
      });
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
      if (this.ajouteExperience) {
        this.form.reset();
        this._portfolioService.addData([{ data: experienceData, contentType: "experience" }])
          .subscribe(data => this.getMessage = { type: "success", message: "La nouvelle experience a été ajouté avec succèss" });
      } else {
        this._portfolioService.editData([{ data: experienceData, contentType: "experience" }])
          .subscribe(data => this.getMessage = { type: "success", message: "La nouvelle experience a été modifié avec succèss" });
      }
    }
  
    deleteExperienceData(deleteData) {
      this.form.reset();
      this._portfolioService.deleteData([{ data: deleteData, contentType: "experience" }])
        .subscribe();
    }
  
  }
  