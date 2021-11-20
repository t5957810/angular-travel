import { Component, OnInit } from '@angular/core';
import { AppConstant } from '../shared/model/app-constant';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent implements OnInit {
  title = AppConstant.ATTRACTION;
  constructor() { }

  ngOnInit(): void {
  }

}
