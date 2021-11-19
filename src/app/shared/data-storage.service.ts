import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseData } from '../attractions/model/responseData.interface';
import { AttractionsService } from '../attractions/attractions.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private attractionsService: AttractionsService) { }

  fetchAttractions() {
    return this.http.get(environment.defaultAPI).pipe(
      map(data => data['result']),
      tap((responseData: ResponseData) => {
        const records = responseData.records;
        records.shift();
        this.attractionsService.setAttractions(records);
      })
    );
  }

}
