import { map, tap } from 'rxjs/operators';
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
      map(data => data['result'].records),
      tap((attractionList: Attraction[]) => {
        attractionList.shift();  // 把第一個多餘的移除
        const list = attractionList.map(each => new Attraction(each.Company, each.The_county));
        this.attractionsService.setAttractions(list);
      })
    );
  }

}
