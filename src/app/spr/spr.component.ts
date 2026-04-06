import { Component, OnInit } from '@angular/core';
import { SprData } from './models/spr.model';
import { SprDataService } from './spr-data.service';

@Component({
  selector: 'app-spr',
  templateUrl: './spr.component.html',
  styleUrls: ['./spr.component.scss']
})
export class SprComponent implements OnInit {
  data!: SprData;
  title = 'PO-Line Detail Page';
  constructor(private sprService: SprDataService) {}

  ngOnInit(): void {
    this.data = this.sprService.getData();
  }

  print(): void {
    window.print();
  }

  getOtdClass(status: string): string {
    if (status === 'Actual OT')       return 'otd-actual';
    if (status === 'Forecast OT')     return 'otd-forecast';
    if (status === 'Forecasted Late') return 'otd-late';
    return '';
  }

  getDocStatusClass(status: string): string {
    return status === 'Closed' ? 'doc-closed' : 'doc-open';
  }
}
