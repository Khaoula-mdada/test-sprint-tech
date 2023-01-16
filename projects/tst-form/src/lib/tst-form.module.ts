import { HttpClient, HttpClientModule, } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { TstFormComponent } from './component/tst-form.component';



@NgModule({
  declarations: [
    
  ],
  imports: [
    HttpClientModule,TstFormComponent,RouterModule.forRoot([]), BrowserAnimationsModule
  ],
  exports: [
  ],
})
export class TstFormModule { }
