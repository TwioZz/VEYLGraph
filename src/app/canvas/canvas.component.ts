import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Task, XY } from '../models/Task';
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
    const task = new Task(1, '50', 30);
    const task2 = new Task(2, '50', this.randomInt());
    const task3 = new Task(3, '50', this.randomInt());
    const task4 = new Task(4, '50', 0);
    const task5 = new Task(5, '50', this.randomInt());
    const task6 = new Task(6, '50', this.randomInt());
    const task7 = new Task(7, '50', this.randomInt());

    task.liaison.sortant.push(task2);
    task2.liaison.entrant.push(task);

    task2.liaison.sortant.push(task4);
    task4.liaison.entrant.push(task2);

    task.liaison.sortant.push(task3);
    task3.liaison.entrant.push(task);

    task3.liaison.sortant.push(task4);
    task4.liaison.entrant.push(task3);

    const tasks: Task[] = [];
    tasks.push(task);
    tasks.push(task2);
    tasks.push(task3);
    tasks.push(task4);
    tasks.push(task5);
    tasks.push(task6);
    tasks.push(task7);
    this.graph = new Graph(tasks);
    let time = 0;
    setInterval(() => {
      this.resetGraph();
      this.drawGraph(time);
      time = time + 1;
    }, 1000);
  }

  randomInt(){
    return Math.floor(Math.random() * Math.floor(7));
  }

  drawGraph(time: number){
    this.graph.tasks.forEach((task: Task) => {
      const maxDistanceTask = task.calculateMaxDistance();
      this.drawTask(task, maxDistanceTask, this.graph.getY(maxDistanceTask), time);
    });

    this.graph.tasks.forEach((taskForm: Task) => {
      taskForm.liaison.sortant.forEach((taskTo: Task) => {
        this.drawLiaison(taskForm, taskTo);
      });
    });
  }

  resetGraph() {
    this.graph.coordAlreadyUse.clear();
    this.canvas.clearRect(0, 0, 1000, 1000);
  }

  drawTask(task: Task, column: number, line: number, time: number) {
    // Affection et enregistrement de la position de la tache
    task.pos.x = this.pixelStartColumn[column];
    task.pos.y = this.pixelStartLine[line];
    this.graph.addCoord(column);

    // Carré vert avancement de la tâche
    if(time > task.calculateStartTime() && time < task.calculateEndTime()){
      let pourcentageAvancement = ((time - task.calculateStartTime()) * 100 / task.duree) / 100;
      this.canvas.fillStyle = 'green';
      this.canvas.fillRect(task.pos.x, task.pos.y + ((1 - pourcentageAvancement) * this.heightTask), this.widthTask, pourcentageAvancement * this.heightTask);
    } else if(time >= task.calculateEndTime()) {
      this.canvas.fillStyle = 'green';
      this.canvas.fillRect(task.pos.x, task.pos.y, this.widthTask, this.heightTask);
    }

    // Dessin de la tâche
    this.canvas.strokeStyle = '#000000';
    this.canvas.strokeRect(task.pos.x, task.pos.y, this.widthTask, this.heightTask);

    // Affichage et centrage du texte ( max 2 caractères )
    this.canvas.font = '24px serif';
    if (task.id < 10) {
      this.canvas
        .strokeText(task.id.toString(),
          (task.pos.x + (this.widthTask / 2)) - 6,
          (task.pos.y + (this.heightTask / 2)) + 8,
          50);
    } else {
      this.canvas
        .strokeText(task.id.toString(),
          (task.pos.x + (this.widthTask / 2)) - 12,
          (task.pos.y + (this.heightTask / 2)) + 8,
          50);
    }

    // Enregistrement des points d'accroches
    task.pointDaccrocheEntrant.x = task.pos.x;
    task.pointDaccrocheEntrant.y = (task.pos.y + (this.widthTask / 2));
    task.pointDaccrocheSortant.x = task.pos.x + this.widthTask;
    task.pointDaccrocheSortant.y = task.pos.y + (this.widthTask / 2);
  }

  drawLiaison(taskFrom: Task, taskTo: Task){
    const headlen = 10;
    const angle = Math
      .atan2(taskTo.pointDaccrocheEntrant.y - taskFrom.pointDaccrocheSortant.y,
        taskTo.pointDaccrocheEntrant.x - taskFrom.pointDaccrocheSortant.x);


    // Trace la ligne de la tâche sortante à la tâche entrante
    this.canvas.strokeStyle = '#000000';
    this.canvas.beginPath();
    this.canvas.moveTo(taskFrom.pointDaccrocheSortant.x, taskFrom.pointDaccrocheSortant.y);
    this.canvas.lineTo(taskTo.pointDaccrocheEntrant.x, taskTo.pointDaccrocheEntrant.y);
    this.canvas.stroke();


    // Commence à tracer un côté de du triangle
    this.canvas.fillStyle = '#000000';
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
