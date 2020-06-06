import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreateGraphComponent } from './card-create-graph.component';

describe('CardCreateGraphComponent', () => {
  let component: CardCreateGraphComponent;
  let fixture: ComponentFixture<CardCreateGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardCreateGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCreateGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
