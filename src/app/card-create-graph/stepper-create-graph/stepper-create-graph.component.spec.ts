import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperCreateGraphComponent } from './stepper-create-graph.component';

describe('StepperCreateGraphComponent', () => {
  let component: StepperCreateGraphComponent;
  let fixture: ComponentFixture<StepperCreateGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperCreateGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperCreateGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
