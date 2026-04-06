import { Component, Input } from '@angular/core';
import { SprData } from '../../models/spr.models';

@Component({
  selector: 'app-po-line-detail',
  templateUrl: './po-line-detail.component.html',
  styleUrls: ['./po-line-detail.component.scss']
})
export class PoLineDetailComponent {
  @Input() data!: SprData;

  get leftItems() { return this.data.poLineItems.slice(0, Math.ceil(this.data.poLineItems.length / 2)); }
  get rightItems() { return this.data.poLineItems.slice(Math.ceil(this.data.poLineItems.length / 2)); }
}
