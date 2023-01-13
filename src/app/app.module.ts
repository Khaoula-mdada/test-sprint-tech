import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CreationComponent } from 'src/pages/creation/creation.component';
import { HomeComponent } from 'src/pages/home/home.component';
import { UpdateComponent } from 'src/pages/update/update.component';
import { AppRoutingModule, routes } from './app-routing.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { NavigationButtonsComponent } from 'src/components/navigation-buttons/navigation-buttons.component';
import { HeaderComponent } from 'src/components/header/header.component';
import { FooterComponent } from 'src/components/footer/footer.component';
import { TstFormComponent } from 'tst-form';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ListComponent } from 'src/pages/list/list.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { TstFormService } from 'projects/tst-form/src/public-api';


@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    CreationComponent,
    HomeComponent,NavigationButtonsComponent,HeaderComponent,FooterComponent,ListComponent],
   
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, MatButtonModule,TstFormComponent,MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,RouterTestingModule,
    MatChipsModule, RouterModule.forRoot([]),
    MatAutocompleteModule,MatIconModule,HttpClientModule,DatePipe
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
