import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-terrain',
  templateUrl: './terrain.component.html',
  styleUrls: ['./terrain.component.css'],
})
export class TerrainComponent {
  @Input() name: string;
  @Output() click: EventEmitter<any> = new EventEmitter();

  get className() {
    return this.name.replace(/\s/g, '-').toLowerCase();
  }

  handleClick() {
    this.click.emit();
  }
}
