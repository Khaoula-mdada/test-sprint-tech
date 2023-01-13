import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reporting } from 'tst-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  constructor(private _router:Router) { }
  list =[{
    "id": 1,
    "author": {
      "first_name": "khaoula",
      "last_name": "mdada",
      "birth_date": "5-01-2023",
      "sex": "Femme",
      "email": "kha@gmail.com"
    },
    "description": "dfgh,j./",
    "observations": [
      {
        "id": 1,
        "name": "Observation 1",
      },
      {
        "id": 2,
        "name": "Observation 2",
      },

    ]
  },{
    "id": 3,
    "author": {
      "first_name": "houda",
      "last_name": "mdada",
      "birth_date": "5-01-2023",
      "sex": "Femme",
      "email": "kha@gmail.com"
    },
    "description": "dfgh,j./",
    "observations": [
      {
        "id": 1,
        "name": "Observation 1",
      },
      {
        "id": 2,
        "name": "Observation 2",
      },

    ]
  },{
    "id": 4,
    "author": {
      "first_name": "saief",
      "last_name": "mdada",
      "birth_date": "5-01-2023",
      "sex": "Femme",
      "email": "kha@gmail.com"
    },
    "description": "dfgh,j./",
    "observations": [
      {
        "id": 1,
        "name": "Observation 1",
      },
      {
        "id": 2,
        "name": "Observation 2",
      },

    ]
  }]
  finalList = this.list.map(x=>JSON.parse(JSON.stringify(x)))
  ngOnInit(): void {

  }
  update(id:number){
    this._router.navigate(['/update',id])
  }

}
