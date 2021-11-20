import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { AttractionsService } from './attractions.service';
import { Attraction } from './model/attraction.class';

@Injectable({
  providedIn: 'root'
})
export class AttractionsResolver implements Resolve<Attraction[]> {
  constructor(
    private dataStorageService: DataStorageService, 
    private attractionsService: AttractionsService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Attraction[]> | Attraction[]  {
    const attractions = this.attractionsService.getAttractions();

    if(attractions.length === 0 ){
      return this.dataStorageService.fetchAttractions();
    }
    return attractions;
  }
}
