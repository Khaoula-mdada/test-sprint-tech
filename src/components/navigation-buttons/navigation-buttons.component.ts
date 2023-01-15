import { Component, OnInit } from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss']
  
})
export class NavigationButtonsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
