import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-stepper-create-graph',
  templateUrl: './stepper-create-graph.component.html',
  styleUrls: ['./stepper-create-graph.component.css']
})
export class StepperCreateGraphComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.firstFormGroup = this.formBuilder.group({
      taches: ['', Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      liaisons: ['', Validators.required]
    });

    this.thirdFormGroup = this.formBuilder.group({
      semaphores: ['']
    });
  }

}
