import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBasicPageComponent } from './add-basic-page.component';

describe('AddBasicPageComponent', () => {
  let component: AddBasicPageComponent;
  let fixture: ComponentFixture<AddBasicPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBasicPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBasicPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
