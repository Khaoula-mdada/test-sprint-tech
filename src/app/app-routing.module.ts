import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { HomeComponent } from 'src/pages/home/home.component';
import { CreationComponent } from 'src/pages/creation/creation.component';
import { UpdateComponent } from 'src/pages/update/update.component';


const routes: Routes = [
  { path: '', component: HomeComponent, },
  { path: 'create', component: CreationComponent },
  { path: 'update', component: UpdateComponent }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  declarations: [],
  exports: [RouterModule, ],

})
export class AppRoutingModule { }
