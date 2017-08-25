import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEtudesFormationsComponent } from './list-etudes-formations.component';

describe('ListEtudesFormationsComponent', () => {
  let component: ListEtudesFormationsComponent;
  let fixture: ComponentFixture<ListEtudesFormationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEtudesFormationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEtudesFormationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
