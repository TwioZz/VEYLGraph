import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../../models/Task';
import {MatExpansionPanel} from '@angular/material/expansion';
import {StepperSelectionEvent} from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper-create-graph',
  templateUrl: './stepper-create-graph.component.html',
  styleUrls: ['./stepper-create-graph.component.css']
})
export class StepperCreateGraphComponent implements OnInit {

  tasks: Task[];
  tasksFormGroup: FormGroup;
  liaisonsFormGroup: FormGroup;

  @Output() tasksEventEmitter: EventEmitter<Task[]> = new EventEmitter<Task[]>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.tasks = [];
    this.tasksFormGroup = new FormGroup({
      tasks: new FormArray([], Validators.required)
    });

    this.liaisonsFormGroup = new FormGroup({
      liaisons: new FormArray([])
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
        [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/), Validators.max(99)]),
    }));
  }

  deleteTask(index: number) {
    (this.tasksFormGroup.get('tasks') as FormArray).removeAt(index);
  }

  addLiaison() {
    const liaisonsFormArray: FormArray = this.liaisonsFormGroup.get('liaisons') as FormArray;
    this.resetAndSetLiaisons(liaisonsFormArray);

    liaisonsFormArray.push(new FormGroup({
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required)
    }));
    this.emitTasks();
  }

  deleteLiaison(index: number) {
    const liaisonsFormArray: FormArray = this.liaisonsFormGroup.get('liaisons') as FormArray;
    liaisonsFormArray.removeAt(index);

    this.resetAndSetLiaisons(liaisonsFormArray);
    this.emitTasks();
  }

  resetAndSetLiaisons(liaisonsFormArray: FormArray) {
    this.tasks.forEach((task: Task) => {
      task.liaison.entrant = [];
      task.liaison.sortant = [];
    });

    liaisonsFormArray.controls.forEach((formGroup: FormGroup) => {
      if (formGroup.valid) {
        const fromTask: Task = formGroup.value.from;
        const toTask: Task = formGroup.value.to;

        fromTask.liaison.sortant.push(toTask);
        toTask.liaison.entrant.push(fromTask);
      }
    });
  }

  onSelectionChange($event: StepperSelectionEvent) {
    if ($event.previouslySelectedIndex === 0) {
      this.tasks = this.tasksFormGroup.value.tasks.map((task: Task) => {
        return new Task(task.id, task.name, task.duree);
      });
    }
  }

  log(test) {
    console.log(test);
  }

  emitTasks() {
    this.tasksEventEmitter.emit(this.tasks);
  }
}
