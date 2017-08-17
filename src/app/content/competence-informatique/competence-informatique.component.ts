import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder, FormGroup } from "@angular/forms";
import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: 'app-competence-informatique',
  templateUrl: './competence-informatique.component.html',
  styleUrls: ['./competence-informatique.component.css']
})
export class CompetenceInformatiqueComponent implements OnInit {

  componentDetails = null;
  errorMessage = "";
  error = null;

  constructor(private _route: ActivatedRoute, private _portfolioService: PortfolioService, private _router: Router) { }

  ngOnInit() {
    const id = this._route.snapshot.params.id;

    this._portfolioService.getCompetenceById(id)
    .subscribe(

      data => {
        this.handleServerResponse(data);       
      },
      error => {
        this.handleError(error);
      }
    )
  }
  handleServerResponse(response) {    
    if (response.success) {
      this.componentDetails = response.dataCompetence
    } else {
      this._router.navigate(['**'])
    }
  }
  handleError(error){
    console.log('handleError ', error.message);
    this.error = error;
  }
}
