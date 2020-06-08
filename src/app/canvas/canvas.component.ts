import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Task } from '../models/Task';
import { Graph } from '../models/Graph';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  canvasElement: ElementRef<HTMLCanvasElement>;
  graph: Graph;

  heightTask = 50;
  widthTask = 50;
  pixelStartColumn: number[] = [10 , 160, 310, 460];
  pixelStartLine: number[] = [10 , 110, 210, 310];


  canvas: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasElement.nativeElement.getContext('2d');
    const task = new Task(1, '50', 5);
    const task2 = new Task(2, '50', 5);
    const task3 = new Task(3, '50', 5);
    const task4 = new Task(4, '50', 5);
    const task5 = new Task(5, '50', 5);

    task.liaison.sortant.push(task2);
    task2.liaison.entrant.push(task);

    task.liaison.sortant.push(task3);
    task3.liaison.entrant.push(task);

    task2.liaison.sortant.push(task4);
    task4.liaison.entrant.push(task2);

    task4.liaison.sortant.push(task5);
    task5.liaison.entrant.push(task4);

    task3.liaison.sortant.push(task5);
    task5.liaison.entrant.push(task3);

    const tasks: Task[] = [];
    tasks.push(task);
    tasks.push(task2);
    tasks.push(task3);
    tasks.push(task4);
    tasks.push(task5);
    this.graph = new Graph(tasks);



    this.drawGraph();

  }

  drawGraph(){
    this.graph.tasks.forEach((task: Task) => {
      this.drawTask(task, task.calculateMaxDistance(), task.calculateMaxLine());
    }) 
    
  }

  drawTask(task: Task, column: number, line: number) {
    this.canvas.strokeStyle = '#000000';
    this.canvas.strokeRect(this.pixelStartColumn[column], this.pixelStartLine[line], this.widthTask, this.heightTask);

    // Enregistrement de la position de la tache
    task.pos.x = this.pixelStartColumn[column];
    task.pos.y = this.pixelStartLine[line];
    task.placementVertical = task.placementVertical+1;



    // Affichage et centrage du texte ( max 2 caractères )
    this.canvas.font = '24px serif';
    if (task.id < 10) {
      this.canvas
        .strokeText(task.id.toString(),
          (this.pixelStartColumn[column] + (this.widthTask / 2)) - 6,
          (this.pixelStartLine[line] + (this.heightTask / 2)) + 8,
          50);
    } else {
      this.canvas
        .strokeText(task.id.toString(),
          (this.pixelStartColumn[column] + (this.widthTask / 2)) - 12,
          (this.pixelStartLine[line] + (this.heightTask / 2)) + 8,
          50);
    }


    // Enregistrement des points d'accroches
    task.pointDaccrocheEntrant.x = this.pixelStartColumn[column];
    task.pointDaccrocheEntrant.y = (this.pixelStartLine[line] + (this.widthTask / 2));
    task.pointDaccrocheSortant.x = this.pixelStartColumn[column] + this.widthTask;
    task.pointDaccrocheSortant.y = this.pixelStartLine[line] + (this.widthTask / 2);
  }

  drawLiaison(taskFrom: Task, taskTo: Task){
    const headlen = 10;
    const angle = Math
      .atan2(taskTo.pointDaccrocheEntrant.y - taskFrom.pointDaccrocheSortant.y,
        taskTo.pointDaccrocheEntrant.x - taskFrom.pointDaccrocheSortant.x);


    // Trace la ligne de la tâche sortante à la tâche entrante
    this.canvas.beginPath();
    this.canvas.moveTo(taskFrom.pointDaccrocheSortant.x, taskFrom.pointDaccrocheSortant.y);
    this.canvas.lineTo(taskTo.pointDaccrocheEntrant.x, taskTo.pointDaccrocheEntrant.y);
    this.canvas.stroke();


    // Commence à tracer un côté de du triangle
    this.canvas.beginPath();
    this.canvas.moveTo(taskTo.pointDaccrocheEntrant.x, taskTo.pointDaccrocheEntrant.y);
    this.canvas
      .lineTo(taskTo.pointDaccrocheEntrant.x - headlen * Math.cos(angle - Math.PI / 7),
        taskTo.pointDaccrocheEntrant.y - headlen * Math.sin(angle - Math.PI / 7));


    // Trace l'autre côté du triangle
    this.canvas
      .lineTo(taskTo.pointDaccrocheEntrant.x - headlen * Math.cos(angle + Math.PI / 7),
        taskTo.pointDaccrocheEntrant.y - headlen * Math.sin(angle + Math.PI / 7));

    // Ferme le triangle
    this.canvas.lineTo(taskTo.pointDaccrocheEntrant.x, taskTo.pointDaccrocheEntrant.y);
    this.canvas
      .lineTo(taskTo.pointDaccrocheEntrant.x - headlen * Math.cos(angle - Math.PI / 7),
        taskTo.pointDaccrocheEntrant.y - headlen * Math.sin(angle - Math.PI / 7));

    // Trace et rempli le bout de la flèche (Le triangle)
    this.canvas.stroke();
    this.canvas.fill();
  }
}
