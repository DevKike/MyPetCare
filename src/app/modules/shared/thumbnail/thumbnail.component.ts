import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-thumbnail',
  templateUrl: './thumbnail.component.html',
  styleUrls: ['./thumbnail.component.scss'],
})
export class ThumbnailComponent {
  @Input() label!: string;
  @Input() url!: string;
}
