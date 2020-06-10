import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Task} from '../models/Task';

@Component({
  selector: 'app-card-create-graph',
  templateUrl: './card-create-graph.component.html',
  styleUrls: ['./card-create-graph.component.css']
})
export class CardCreateGraphComponent implements OnInit {

  @Output() tasksEventEmitter: EventEmitter<Task[]> = new EventEmitter<Task[]>();

  constructor() { }

  ngOnInit(): void {
  }

  getTasksAndEmit($event: Task[]) {
    this.tasksEventEmitter.emit($event);
  }
}
