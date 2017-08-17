import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from "@angular/forms";
import { PortfolioService } from "../../services/portfolio.service";

@Component({
  selector: 'app-competence-informatique',
  templateUrl: './competence-informatique.component.html',
  styleUrls: ['./competence-informatique.component.css']
})
export class CompetenceInformatiqueComponent implements OnInit {

  componentDetails = [];
  errorMessage = "";
  error = null;
  types = [];
  form: FormGroup;
  messageSuccess = true

  constructor(private _formBuilder: FormBuilder, private _route: ActivatedRoute, private _portfolioService: PortfolioService, private _router: Router) { }

  ngOnInit() {
    this.form = this._formBuilder.group({
      id: -1,
      title: "",
      type: null,
      createdDate: new Date(),
      modifiedDate: new Date(),
      path: ""
    })

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
    this._portfolioService.getTypeCompetence()
      .subscribe(
      data => this.types = data
      )


  }
  handleServerResponse(response) {
    if (response.success) {
      this.componentDetails = response.dataCompetence;
      this.form = this._formBuilder.group({
        id: response.dataCompetence.id,
        title: response.dataCompetence.title,
        type: parseInt(response.dataCompetence.type),
        createdDate: response.dataCompetence.createdDate,
        modifiedDate: new Date(),
        path: response.dataCompetence.path
        
      });
      this.getNewPath(response.dataCompetence.title);
      
    } else {
      this._router.navigate(['**'])
    }
  }
  handleError(error) {
    console.log('handleError ', error.message);
    this.error = error;
  }
  editCompetence(editCompetence) {

    if (editCompetence.path == "") {
      this.getNewPath(editCompetence.title);

      editCompetence.path = "/competence-informatique/";
    }
    this._portfolioService.editComponent(editCompetence)
      .subscribe();
    this.messageSuccess = false;
    // location.reload();
    // this._router.navigate(['/list-competences-informatique'])

  }
  getNewPath(newPath){
    newPath = newPath.trim().toLowerCase().replace(' ', '-')

    var test = "tesé235t";

    for(let i = 0; i < test.length; i++){
      const regex = /^[a-z0-9]*/;
      const str = test[i];
      let m;
      
      if ((m = regex.exec(str)) !== null) {
          // The result can be accessed through the `m`-variable.
          m.forEach((match, groupIndex) => {
            if(`${match}` == ""){
              ${match} = "-";
            }

          });
      }
      
    }

    // console.log(fromCharCode(65))
    
  }

}
