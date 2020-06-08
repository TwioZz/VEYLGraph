import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../models/Task';
import {MatExpansionPanel} from '@angular/material/expansion';
import {Graph} from '../../models/Graph';
import {StepperSelectionEvent} from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper-create-graph',
  templateUrl: './stepper-create-graph.component.html',
  styleUrls: ['./stepper-create-graph.component.css']
})
export class StepperCreateGraphComponent implements OnInit {

  graph: Graph;
  tasksFormGroup: FormGroup;
  liaisonsFormGroup: FormGroup;
  semaphoresFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.tasksFormGroup = new FormGroup({
      tasks: new FormArray([], Validators.required)
    });

    this.liaisonsFormGroup = this.formBuilder.group({
      liaisons: ['', Validators.required]
    });

    this.semaphoresFormGroup = this.formBuilder.group({
      semaphores: ['']
    });
  }

  addTask(matExpansionPanel: MatExpansionPanel) {
    matExpansionPanel.open();
    const tasksFormArray: FormArray = this.tasksFormGroup.get('tasks') as FormArray;
    tasksFormArray.push(new FormGroup({
      id: new FormControl(tasksFormArray.length + 1,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.max(99)]),
      name: new FormControl('New Task ' + (tasksFormArray.length + 1),
        Validators.required),
      duree: new FormControl(1,
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.max(99)])
    }));
  }

  deleteTask(index: number) {
    (this.tasksFormGroup.get('tasks') as FormArray).removeAt(index);
  }

  log(value) {
    console.log(new Graph(this.tasksFormGroup.value));
    console.log(value);
    // console.log(JSON.parse(JSON.stringify(value)));
  }

  onSelectionChange($event: StepperSelectionEvent) {
    if ($event.previouslySelectedIndex === 0) {
      this.graph = new Graph(this.tasksFormGroup.value.tasks.map((task: Task) => {
        return new Task(task.id, task.name, task.duree);
      }));
    }
  }
}
