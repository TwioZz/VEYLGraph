import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  canvasElement: ElementRef<HTMLCanvasElement>;

  canvas: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.canvas = this.canvasElement.nativeElement.getContext('2d');
    this.drawTask(10 , 10, 50, 50, '12');
  }

  drawTask(positionX, positionY, width, height, text: string, couleur: string = '#000000') {
    this.canvas.strokeStyle = couleur;
    this.canvas.strokeRect(positionX, positionY, width, height);

    this.canvas.font = '24px serif';
    if (text.length === 1) {
      this.canvas.fillText(text, (positionX + (width / 2)) - 6, (positionY + (height / 2)) + 8, 50);
    } else if (text.length === 2 ) {
      this.canvas.strokeText(text, (positionX + (width / 2)) - 12, (positionY + (height / 2)) + 8, 50);
    }
  }
}
