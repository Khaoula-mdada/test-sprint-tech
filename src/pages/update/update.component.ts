import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  constructor(private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    if(this._Activatedroute?.params)
    {this._Activatedroute?.params.subscribe(params => { 
  });}
  }
}
