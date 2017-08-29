import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';


import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-competence-informatique-form',
  templateUrl: './competence-informatique-form.component.html',
  styleUrls: ['./competence-informatique-form.component.css']
})
export class CompetenceInformatiqueFormComponent implements OnInit {

  form: FormGroup;
  types: any = [];
  competences: any= [];
  competenceSubject = new Subject();
  verifValidationData = [];
  incrementation: any;
  titleContenu = 'Ajouter une nouvelle compétence informatique';
  ajouterCompetence = true;
  getMessage = { type: '', message: '' };

  constructor(
    private formBuilder: FormBuilder,
    private _portfolioService: PortfolioService,
    private _router: Router
  ) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      id: -1,
      title: '',
      type: null,
      createdDate: new Date(),
      modifiedDate: new Date(),
      uploader: ''
    });

    this._portfolioService.getData('competence')
      .subscribe(
      data => this.competences = data
      );

    this._portfolioService.getData('competenceType')
      .subscribe(
      data => this.types = data
      );

    // console.log(this.types)

    this._portfolioService.competenceSubject.subscribe(data => {
      this.competences = [...this.competences, data];
    });
    this._portfolioService.deleteSubject.subscribe(data => {
      this.competences = data;
      this.getMessage = { type: 'success', message: 'La nouvelle formation a été supprimée avec succèss' };
    });
    this._portfolioService.editSubject.subscribe(data => {
      this.competences = data;
      this.getMessage = { type: 'success', message: 'La nouvelle formation a été modifiée avec succèss' };
    });
  }


  submitForm(formData) {
    this.form.reset();

    formData.uploader = formData.uploader.split('file:///d%3A/Sites/portfolio/src/assets/images/')[1];
    if (this.ajouterCompetence) {
      formData.createdDate = new Date();
      formData.modifiedDate = new Date();

      this._portfolioService.addData([{ data: formData, contentType: 'competence' }])
        .subscribe();
    } else {
      this._portfolioService.editData([{ data: formData, contentType: 'competence' }])
      .subscribe();
    }
  }

  deleteCompetenceData(competenceData) {
    this.verifValidationData = [{ data: competenceData, contentType: 'competence' }];
  }

  editFormationData(competenceData) {
    this.titleContenu = 'Modifier la formation';
    this.ajouterCompetence = false;
    this.form = this.formBuilder.group({
      id: competenceData.id,
      title: competenceData.title,
      type: competenceData.type,
      createdDate: competenceData.createdDate,
      modifiedDate: competenceData.modifiedDate,
      uploader: competenceData.uploader
    });
  }


  resetFormationData() {
    this.titleContenu = 'Ajouter une nouvelle compétence informatique';
    this.form.reset();
    this.ajouterCompetence = true;
  }

}
