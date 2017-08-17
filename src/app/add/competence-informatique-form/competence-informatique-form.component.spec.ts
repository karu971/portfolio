import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceInformatiqueFormComponent } from './competence-informatique-form.component';

describe('CompetenceInformatiqueFormComponent', () => {
  let component: CompetenceInformatiqueFormComponent;
  let fixture: ComponentFixture<CompetenceInformatiqueFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetenceInformatiqueFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceInformatiqueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
