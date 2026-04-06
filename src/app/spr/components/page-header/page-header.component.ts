import { Component, Input } from '@angular/core';
import { SprHeader } from '../../models/spr.models';

@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent {
  @Input() header!: SprHeader;
  @Input() pageTitle!: string;
}
