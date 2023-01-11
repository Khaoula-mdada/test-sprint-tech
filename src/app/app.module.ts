import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CreationComponent } from 'src/pages/creation/creation.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { UpdateComponent } from 'src/pages/update/update.component';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavigationButtonsComponent } from 'src/components/navigation-buttons/navigation-buttons.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { FooterComponent } from 'src/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    CreationComponent,
    HomeComponent,NavigationButtonsComponent,HeaderComponent,FooterComponent],
   
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
