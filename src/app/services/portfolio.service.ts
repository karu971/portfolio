import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';



@Injectable()
export class PortfolioService {

  competence = [];
  competenceSubject = new Subject();
  deleteSubject = new Subject();
  BASE_URL = "http://localhost:4201/";

  constructor(private _http: Http) { }

  getCompetence() {
    return this._http.get(this.BASE_URL + 'api/competences')
      .map(res => res.json())
  }

  addCompetence(competenceData) {

    return this._http.post(this.BASE_URL + 'api/add/competences', competenceData)
      .map(res => {
        this.competenceSubject.next(competenceData);
        console.log(competenceData)
        
      })
  }

  getCompetenceById(componentById) {

    return this._http.get(this.BASE_URL + `api/competence/${componentById}`)
      .map(res => res.json())
  }

  getTypeCompetence() {
    return this._http.get(this.BASE_URL + 'api/competenceType')
      .map(res => res.json())
  }

  addTypeCompetence(competenceTypeData) {
    return this._http.post(this.BASE_URL + 'api/add/competenceType', competenceTypeData)
      .map(res => {
        console.log(competenceTypeData)
        this.competenceSubject.next(competenceTypeData);
      })
  }

  editComponent(editComponentData) {

    return this._http.post(this.BASE_URL + 'api/edit/competence', editComponentData)
      .map(res => {

        this.competenceSubject.next(editComponentData);

      })
  }

  deleteData(deleteDataId) {
    return this._http.post(this.BASE_URL + `api/delete/competence`, deleteDataId)
      .map(res => {
        // res.json();    
        this.deleteSubject.next(res.json())
        console.log(res.json());
        

      })
  }

}
