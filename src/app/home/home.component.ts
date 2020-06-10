import {Component, OnInit} from '@angular/core';
import {Graph} from '../models/Graph';
import {Task} from '../models/Task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  graph: Graph;

  constructor() { }

  ngOnInit(): void {
  }

  getTasks($event: Task[]) {
    this.graph = new Graph($event);
  }
}
