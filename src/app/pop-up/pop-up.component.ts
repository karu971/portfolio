import { Component, OnInit, Input } from '@angular/core';
import { PortfolioService } from "../services/portfolio.service";
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {

  @Input() verifValidationData: any;

  deleteElement = [];
  elementSubject = new Subject();

  constructor(private _portfolioService: PortfolioService) { }

  ngOnInit() {}

  getDeleteElement(deleteData) {
    this._portfolioService.deleteData(deleteData)
      .subscribe();
    return this.elementSubject.next(deleteData)
  }
}
