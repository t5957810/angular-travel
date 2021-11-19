import { Component, Input, OnInit } from '@angular/core';
import { Attraction } from '../model/attraction.class';

@Component({
  selector: 'app-attraction-item',
  templateUrl: './attraction-item.component.html',
  styleUrls: ['./attraction-item.component.scss']
})
export class AttractionItemComponent implements OnInit {
  @Input('attractionData') attraction :Attraction;
  @Input('attractionIndex') index :number;

  constructor() { }

  ngOnInit(): void {
  }

}
