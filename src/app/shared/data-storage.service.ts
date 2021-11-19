import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AttractionsService } from '../attractions/attractions.service';
import { Attraction } from '../attractions/model/attraction.class';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private attractionsService: AttractionsService) { }

  fetchAttractions() {
    return this.http.get(environment.defaultAPI).pipe(
      tap((attractionList: Attraction[]) => {
        const list = attractionList.map((each: Attraction) =>
          new Attraction(each.address, each.distict, each.floors, each.houseHolds, each.lat, each.lng, each.name, each.persons, each.progress));
        this.attractionsService.setAttractions(list);
      })
    );
  }
}
