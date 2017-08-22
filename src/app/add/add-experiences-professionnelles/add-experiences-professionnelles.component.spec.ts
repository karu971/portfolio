import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExperiencesProfessionnellesComponent } from './add-experiences-professionnelles.component';

describe('AddExperiencesProfessionnellesComponent', () => {
  let component: AddExperiencesProfessionnellesComponent;
  let fixture: ComponentFixture<AddExperiencesProfessionnellesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExperiencesProfessionnellesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExperiencesProfessionnellesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
