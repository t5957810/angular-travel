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
    this.setLocalStorage();
  }

  autoGetFavoritesAttractions() {
    const favoritesData = JSON.parse(localStorage.getItem('favoritesData'));
    if (!favoritesData) {
      return;
    }
    this.setFavoritesAttractions(favoritesData);
  }

  updateFavoritesAttraction(index: number, newAttraction: Attraction) {
    this.favoritesAttractions[index] = newAttraction;
    this.favoritesAttractionsChanged$.next(this.getFavoritesAttractions());
    this.updateLocalStorage();
  }

  // 把isSelected 是true的移除
  removeFavoritesAttractions() {
    const notSelectedFavoritesAttractions = this.favoritesAttractions.filter((item: Attraction) => !item.isSelected);
    this.setFavoritesAttractions(notSelectedFavoritesAttractions);
    this.updateLocalStorage();
  }

  setLocalStorage() {
    localStorage.setItem('favoritesData', JSON.stringify(this.favoritesAttractions));
  }

  updateLocalStorage() {
    this.clearLocalStorage();
    this.setLocalStorage();
  }

  clearLocalStorage() {
    localStorage.removeItem('favoritesData');
  }

}
