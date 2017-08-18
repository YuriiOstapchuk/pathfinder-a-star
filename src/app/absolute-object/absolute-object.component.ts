import { Component, Input } from '@angular/core';

@Component({
  selector: 'absolute-object',
  templateUrl: './absolute-object.component.html',
  styleUrls: ['./absolute-object.component.css'],
})
export class AbsoluteObjectComponent {
  @Input() top: number;
  @Input() left: number;
  @Input() className: string;
}
