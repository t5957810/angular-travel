import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Attraction } from '../attractions/model/attraction.class';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  favoritesAttractions: Attraction[] = [];
  favoritesAttractionsChanged$ = new Subject<Attraction[]>();

  constructor() { }

  getFavoritesAttractions(): Attraction[] {
    return this.favoritesAttractions.slice();
  }

  setFavoritesAttractions(attractions: Attraction[]) {
    this.favoritesAttractions = attractions;
    this.favoritesAttractionsChanged$.next(this.getFavoritesAttractions());
  }

  addFavoritesAttractions(attractions: Attraction[]) {
    this.favoritesAttractions.push(...attractions);
    this.favoritesAttractionsChanged$.next(this.getFavoritesAttractions());
    localStorage.setItem('favoritesData', JSON.stringify(this.favoritesAttractions));
  }

  autoGetFavoritesAttractions() {
    const favoritesData = JSON.parse(localStorage.getItem('favoritesData'));
    if(!favoritesData) {
      return;
    }
    this.setFavoritesAttractions(favoritesData);
  }

  clearLocalStorage() {
    localStorage.removeItem('favoritesData');
    this.favoritesAttractionsChanged$.next(this.getFavoritesAttractions());
  }

}
