import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Reporting, ReportingAnswer } from 'projects/tst-form/src/lib/types';
import { HttpClient } from '@angular/common/http';
import { TstFormService } from 'projects/tst-form/src/public-api';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers:[TstFormService]
})
export class ListComponent implements OnInit {

  constructor(private _router:Router,private service :TstFormService,private http: HttpClient) { }
  
  finalList :ReportingAnswer[]= []
  ngOnInit(): void {
   this.buildData()
  }
  
  buildData(){
    this.http.get('../../assets/app-data.json').subscribe((data: any) => {
    if(data) {
     this.finalList=data.reportings.map((x:any)=>JSON.parse(JSON.stringify(x)))}
    });
  }
  update(id:number){
    this._router.navigate(['/update',id])
  }

}
