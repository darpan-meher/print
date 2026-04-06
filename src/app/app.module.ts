import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { SprComponent } from './spr/spr.component';
import { SprDataService } from './spr/spr-data.service';

@NgModule({
  declarations: [AppComponent, SprComponent],
  imports: [BrowserModule, CommonModule],
  providers: [SprDataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
