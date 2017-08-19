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
  
  getIncrementationNumber(){
    return this._http.get(this.BASE_URL + `api/incrementation`)
    .map(res => res.json())
  }

  
  editComponent(editComponentData) {
    
    return this._http.post(this.BASE_URL + 'api/edit/competence', editComponentData)
    .map(res => {
      
      this.competenceSubject.next(editComponentData);
      
    })
  }
  
  
  
  itemById(componentById) {
    return this._http.get(this.BASE_URL + `api/competence/157`)
    .map(res => res.json()  )
  }
    

  getData(get_data){  
    return this._http.get(this.BASE_URL + `api/${get_data}`)
    .map(res => res.json())
  }
  
  
  addData(addData) {
    return this._http.post(this.BASE_URL + `api/add/${addData[0].contentType}`, addData[0].data)
    .map(res => {
      return this.getIncrementationNumber()
      .subscribe(
        data => {
          addData.id = data.id
          this.competenceSubject.next(addData[0].data);        
        }
      )
    })
  }
  
  
  
  deleteData(deleteData) {
    return this._http.post(this.BASE_URL + `api/delete/${deleteData[0].contentType}`, deleteData[0].data)
    .map(res => {
      console.log(res.json());
      
      this.deleteSubject.next(res.json())      
      
    })
  }
  
}
