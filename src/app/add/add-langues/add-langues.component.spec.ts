import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanguesComponent } from './add-langues.component';

describe('AddLanguesComponent', () => {
  let component: AddLanguesComponent;
  let fixture: ComponentFixture<AddLanguesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLanguesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLanguesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
