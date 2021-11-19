import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppConstant } from '../shared/model/app-constant';
import { Attraction } from './model/attraction.class';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {
  attractions: Attraction[] = [];
  attractionsChanged$ = new Subject<Attraction[]>();

  constructor() { }

  getAttractions(): Attraction[] {
    return this.attractions.slice();
  }

  getAttraction(iddex: number): Attraction {
    return this.attractions[iddex];
  }


  get countys() {
    const counties = this.attractions.map((item: Attraction) => item.The_county);
    counties.unshift(AppConstant.ALL_COUNTRY);
    return counties;
  }

  setAttractions(attractions: Attraction[]) {
    this.attractions = attractions;
    this.attractionsChanged$.next(this.getAttractions());
  }
}
