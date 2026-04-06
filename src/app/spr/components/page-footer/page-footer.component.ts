import { Component } from '@angular/core';

@Component({
  selector: 'app-page-footer',
  template: `
    <div class="spr-page-footer">
      <span>GE Vernova / SISU Energy &amp; Environmental — Confidential</span>
      <span class="page-num-placeholder">Page <span class="pg"></span></span>
    </div>
  `,
  styles: [`
    .spr-page-footer {
      display: flex;
      justify-content: space-between;
      font-size: 9px;
      color: #888;
      border-top: 1px solid #ccc;
      padding: 4px 0 0;
      margin-top: 8px;
    }
  `]
})
export class PageFooterComponent {}
