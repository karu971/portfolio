import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-add-basic-page',
  templateUrl: './add-basic-page.component.html',
  styleUrls: ['./add-basic-page.component.css']
})
export class AddBasicPageComponent implements OnInit {

  getMessage = { type: '', message: '' };
  form: FormGroup;
  isNew = true;
  basicPages: any = [];
  titleContenu = 'Ajouter une nouvelle page';
  verifValidationData: any = [];


  constructor(
    private _formBuilder: FormBuilder,
    private _portfolioService: PortfolioService
  ) { }

  ngOnInit() {

    this.form = this._formBuilder.group({
      id: -1,
      title: '',
      date: '',
      company: '',
      place: '',
      body: '',
      createdDate: new Date(),
      modifiedDate: new Date()
    });

    this._portfolioService.getData('basicPage')
      .subscribe(data => this.basicPages = data);

    this._portfolioService.competenceSubject.subscribe(data => this.basicPages = [...this.basicPages, data]);
    this._portfolioService.editSubject.subscribe(data => this.basicPages = data);
    this._portfolioService.deleteSubject.subscribe(data => this.basicPages = data);
  }

  submitBasicPage(basicPageData) {
    this.form.reset();
    if (this.isNew) {

      this._portfolioService.addData([{ data: basicPageData, contentType: 'basicPage' }])
      .subscribe(data => this.getMessage = { type: 'success', message: 'La nouvelle page a été ajouté avec succès' });
    } else {
      this._portfolioService.editData([{ data: basicPageData, contentType: 'basicPage' }])
      .subscribe(data => this.getMessage = { type: 'success', message: 'La nouvelle page a été modifié avec succès' });

    }
  }

  resetBasicPageData() {
    this.form.reset();
    this.isNew = true;
  }

  editBasicPageData(editData) {
    this.isNew = false;
    this.titleContenu = 'Modifier la page ' + editData.title;
    this.form = this._formBuilder.group({
      id: editData.id,
      title: editData.title,
      date: editData.date,
      company: editData.company,
      place: editData.place,
      body: editData.body,
      createdDate: editData.createdDate,
      modifiedDate: editData.modifiedDate,
    });
  }

  deleteBasicPageData(deleteData){
    this.verifValidationData = [{ data: deleteData, contentType: 'basicPage' }];
  }
}
