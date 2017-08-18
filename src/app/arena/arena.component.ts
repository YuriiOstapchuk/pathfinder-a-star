import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Arena, Character, Terrain, Wall, Ground, Point } from '../lib/types';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css'],
})
export class ArenaComponent {
  @Input() arena: Arena;
  @Input() character: Character;
  @Output() changeTarget: EventEmitter<Point> = new EventEmitter();

  setTarget(terrain: Terrain, x: number, y: number) {
    if (terrain instanceof Ground) {
      this.changeTarget.emit({ x, y });
    }
  }
}
