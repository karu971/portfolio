import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from "../../services/portfolio.service";
import { FormGroup, FormBuilder } from "@angular/forms";
import { PopUpComponent } from "../../pop-up/pop-up.component";
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-list-competence-informatique',
  templateUrl: './list-competence-informatique.component.html',
  styleUrls: ['./list-competence-informatique.component.css']
})

export class ListCompetenceInformatiqueComponent implements OnInit {

  @Input() nbElementAfficher: string = "all";
  @Input() typeCompetence: string = "";
  @Input() titreCompetence: string = "";
  @Input() colorCompetenceH1: string = "";

  competences: any;
  typeCompetences: any = [];
  verifValidationData = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _portfolioService: PortfolioService,
    private _popUpComponent: PopUpComponent,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    console.log(this.titreCompetence);
    
    if(this._activatedRoute.snapshot.url[0].path == "list-competences-informatique"){
      this.typeCompetence = "7"
      this.titreCompetence = "Compétence informatiques"
    }
    else if(this._activatedRoute.snapshot.url[0].path == "list-langage-informatique"){
      this.typeCompetence = "8"
      this.titreCompetence = "langage informatiques"
    }

    // console.log(this.colorCompetence);
    
    this._portfolioService.getData('competence')
      .subscribe(
      data => this.competences = data,
      error => console.error
      )
    this._portfolioService.getData('competenceType')
      .subscribe(
      data => this.typeCompetences = data[0], // type de competence:  "COMPÉTENCES​ ​INFORMATIQUES"      
      error => console.error
      )
    this._portfolioService.deleteSubject.subscribe(data => this.competences = data)

  }

  deleteItem(competenceData) {
    this.verifValidationData = [{ data: competenceData, contentType: 'competence' }]
  }
  getImage(competence) {
    return this._portfolioService.getImage(competence);
  }
}
