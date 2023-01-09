import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CreationComponent } from 'src/pages/creation/creation.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { UpdateComponent } from 'src/pages/update/update.component';
import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    CreationComponent,
    HomeComponent],
  imports: [
    BrowserModule, AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
