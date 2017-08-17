import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceTypeComponent } from './competence-type.component';

describe('CompetenceTypeComponent', () => {
  let component: CompetenceTypeComponent;
  let fixture: ComponentFixture<CompetenceTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetenceTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
