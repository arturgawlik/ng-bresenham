import { Component, OnInit } from '@angular/core';
import { Point } from './helpers/point.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  previouslySelectedPoint: Point | null = null;
  pixels: boolean[][] | null = null;

  ngOnInit(): void {
    this.initPixels();
  }

  setPixel(x: number, y: number) {
    if (!this.pixels)
      return;

    this.pixels[x][y] = true;
    if (!this.previouslySelectedPoint) {
      this.previouslySelectedPoint = { x: x, y: y };
    } else {
      this.bline(this.previouslySelectedPoint.x, this.previouslySelectedPoint.y, x, y);
      this.previouslySelectedPoint = null;
    }
  }

  initPixels() {
    this.pixels = Array.from(Array(80), () => new Array(80));
  }

  bline(x0: number, y0: number, x1: number, y1: number) {
    if (!this.pixels)
      return;

    var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    var dy = Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    var err = (dx>dy ? dx : -dy)/2;

    while (true) {
      this.pixels[x0][y0] = true;
      if (x0 === x1 && y0 === y1) break;
      var e2 = err;
      if (e2 > -dx) { err -= dy; x0 += sx; }
      if (e2 < dy) { err += dx; y0 += sy; }
    }
  }

}
