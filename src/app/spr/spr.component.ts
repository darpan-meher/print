import {
  AfterViewInit, Component, OnDestroy, OnInit
} from '@angular/core';
import { SprData } from './models/spr.model';
import { SprDataService } from './spr-data.service';

export interface SprPage {
  id: string;    // matches data-page-id on .page-sentinel
  title: string; // shown in header, toolbar badge, footer and page subtitle
}

@Component({
  selector: 'app-spr',
  templateUrl: './spr.component.html',
  styleUrls: ['./spr.component.scss']
})
export class SprComponent implements OnInit, AfterViewInit, OnDestroy {

  data!: SprData;

  /**
   * Ordered list of pages.
   * Add new entries here and a matching <div class="page-sentinel"> in the
   * template — the title propagates to the header and footer automatically.
   */
  pages: SprPage[] = [
    { id: 'page-po-detail',  title: 'PO-Line Detail page' },
    { id: 'page-po-summary', title: 'PO summary page'      },
    { id: 'page-attachment', title: 'Attachment'           },
  ];

  /** Bound into the repeating header, toolbar badge, and repeating footer */
  currentPageTitle = this.pages[0].title;

  private observer!: IntersectionObserver;

  constructor(private sprService: SprDataService) {}

  ngOnInit(): void {
    this.data = this.sprService.getData();
    this.assignStage();
  }
  assignStage(){
    let category : any = [];
    for(let i=0; i<=this.data.overallProgress.length-1;i++){ 
      this.data.overallProgress[i].stageNo = 0;    
      if(!this.data.overallProgress[i].stageNo){
        if(category.indexOf(this.data.overallProgress[i].category.split(' - ')[0]) === -1){
          category.push(this.data.overallProgress[i].category.split(' - ')[0]);
          this.data.overallProgress[i].stageNo = 1;
        }else{
          category.push(this.data.overallProgress[i].category.split(' - ')[0]);
          this.data.overallProgress[i].stageNo = category.filter((ele:string)=> ele === this.data.overallProgress[i].category.split(' - ')[0]).length;
        }
      }
    }
    console.log(category);
    console.log(this.data.overallProgress);
  }

  ngAfterViewInit(): void {
    /**
     * IntersectionObserver tracks each invisible .page-sentinel div.
     * When a sentinel enters the viewport (>= 20% visible) the header
     * title switches to that page's title via currentPageTitle.
     */
    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length) {
          const pageId = visible[0].target.getAttribute('data-page-id') ?? '';
          const page   = this.pages.find(p => p.id === pageId);
          if (page) this.currentPageTitle = page.title;
        }
      },
      { threshold: 0.2 }
    );

    document.querySelectorAll('.page-sentinel').forEach(el => {
      this.observer.observe(el);
    });
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  print(): void { window.print(); }

  getOtdClass(status: string): string {
    if (status === 'Actual OT')       return 'otd-actual';
    if (status === 'Forecast OT')     return 'otd-forecast';
    if (status === 'Forecasted Late') return 'otd-late';
    return '';
  }

  getDocStatusClass(status: string): string {
    return status === 'Closed' ? 'doc-closed' : 'doc-open';
  }

  getRowSpan(category:string){
    return this.data.overallProgress.filter((elem)=>{
      return category === elem.category.split(' - ')[0];
    }).length;
  }
}
