import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observation, ReportingAnswer } from 'projects/tst-form/src/lib/types';
import { Observable } from 'rxjs';
import jsonData from'../assets/app-data.json';

@Injectable({
  providedIn: 'root'
})
export class AppDataServicesService {
 public observations: any
  public reportings: any
  constructor(private http: HttpClient) {

  }
  public getJSON(): Observable<any> {
    return this.http.get('../assets/app-data.json');
  }
buildData(){
  this.http.get('../assets/app-data.json').subscribe((data: any) => {
  if(data) {this.observations=data.observations
   this.reportings=data.reportings}
  });
}
}
