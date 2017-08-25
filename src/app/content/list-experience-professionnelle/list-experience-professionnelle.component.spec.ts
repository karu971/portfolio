import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExperienceProfessionnelleComponent } from './list-experience-professionnelle.component';

describe('ListExperienceProfessionnelleComponent', () => {
  let component: ListExperienceProfessionnelleComponent;
  let fixture: ComponentFixture<ListExperienceProfessionnelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExperienceProfessionnelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExperienceProfessionnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
