import { Component, OnInit, OnDestroy } from '@angular/core';
import { Arena, Wall, Ground as G, Character, Point } from './lib/types';
import { sign, findPath } from './lib/pathfinder';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  private interval;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.advance();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  // prettier-ignore
  arena: Arena = [
    [new Wall, new Wall, new Wall, new Wall, new Wall, new Wall, new Wall, new Wall],
    [new Wall, new G(1), new G(1), new G(1), new G(1), new Wall, new G(1), new Wall],
    [new Wall, new G(1), new G(2), new G(2), new G(1), new Wall, new G(1), new Wall],
    [new Wall, new Wall, new Wall, new G(2), new G(1), new Wall, new G(1), new Wall],
    [new Wall, new G(1), new G(1), new G(1), new G(1), new G(2), new G(1), new Wall],
    [new Wall, new G(1), new G(1), new Wall, new Wall, new Wall, new G(1), new Wall],
    [new Wall, new G(1), new G(1), new G(1), new G(1), new G(1), new G(1), new Wall],
    [new Wall, new Wall, new Wall, new Wall, new Wall, new Wall, new Wall, new Wall]
  ]

  character: Character = {
    x: 2,
    y: 1,
    targetX: 1,
    targetY: 1,
    path: [],
  };

  changeTarget({ x, y }: Point) {
    const path = findPath({
      arena: this.arena,
      targetX: x,
      targetY: y,
      characterX: this.character.x,
      characterY: this.character.y,
    });

    this.character.path = path;
    this.character.targetX = x;
    this.character.targetY = y;
  }

  advance() {
    const { character } = this;

    if (character.path.length <= 0) {
      return;
    }

    const [{ x, y }, ...rest] = character.path;

    character.path = rest;
    character.x += sign(x - character.x);
    character.y += sign(y - character.y);
  }
}
