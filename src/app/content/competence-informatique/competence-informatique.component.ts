import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';


@Component({
  selector: 'app-competence-informatique',
  templateUrl: './competence-informatique.component.html',
  styleUrls: ['./competence-informatique.component.css']
})
export class CompetenceInformatiqueComponent implements OnInit {


  componentDetails: any = [];
  competenceTypes: any = [];
  errorMessage = '';
  error = null;
  types = [];
  form: FormGroup;
  messageSuccess = true;
  getId: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _portfolioService: PortfolioService
  ) { }

  ngOnInit() {

    this.form = this._formBuilder.group({
      id: -1,
      title: '',
      type: null,
      createdDate: new Date(),
      modifiedDate: new Date(),
      path: ''
    });


    this.getId = this._activatedRoute.snapshot.params;

    this._portfolioService.getData('competenceType')
      .subscribe(
      data => this.competenceTypes = data);


    this._portfolioService.itemById([{ data: this.getId, contentType: 'competence' }])
      .subscribe(
      data => {
        this.componentDetails = data.data;
      });
  }

  editCompetence(editData) {

    editData.id = parseInt(this.getId.id);
    console.log(this.getId );

    this._portfolioService.editData([{ data: editData, contentType: 'competence' }])
    .subscribe(
      data => console.log(data),
      err => console.log(err),
      () => this._router.navigate(['/list-competences-informatique'])

    );
  }
}
