import {Component, OnInit, ViewChild} from '@angular/core';
import {Task} from '../models/Task';
import {Graph} from '../models/Graph';
import {CanvasComponent} from '../canvas/canvas.component';

@Component({
  selector: 'app-card-create-graph',
  templateUrl: './card-create-graph.component.html',
  styleUrls: ['./card-create-graph.component.css']
})
export class CardCreateGraphComponent implements OnInit {

  graph: Graph;
  @ViewChild(CanvasComponent) canvasComponent: CanvasComponent;

  constructor() { }

  ngOnInit(): void {
  }

  getTasksAndEmit($event: Task[]) {
    this.graph = new Graph($event);
  }

  graphAtTime(time: number) {
    this.canvasComponent.drawGraph(time);
  }
}
