import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceInformatiqueComponent } from './competence-informatique.component';

describe('CompetenceInformatiqueComponent', () => {
  let component: CompetenceInformatiqueComponent;
  let fixture: ComponentFixture<CompetenceInformatiqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetenceInformatiqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceInformatiqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
