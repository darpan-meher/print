import { Component, Input } from '@angular/core';
import { SprData } from '../../models/spr.models';

@Component({
  selector: 'app-po-summary',
  templateUrl: './po-summary.component.html',
  styleUrls: ['./po-summary.component.scss']
})
export class PoSummaryComponent {
  @Input() data!: SprData;
}
