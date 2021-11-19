import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { FavoritesService } from '../favorites/favorites.service';
import { AppConstant } from '../shared/model/app-constant';
import { ShareUtil } from '../shared/model/shareUtil.class';
import { Attraction } from './model/attraction.class';

@Injectable({
  providedIn: 'root'
})
export class AttractionsService {
  attractions: Attraction[] = [];
  attractionsChanged$ = new Subject<Attraction[]>();

  constructor(private favoritesService: FavoritesService) { }

  getAttractions(): Attraction[] {
    return this.attractions.slice();
  }

  getAttraction(iddex: number): Attraction {
    return this.attractions[iddex];
  }

  get disticts() {
    const disticts = [...new Set(this.attractions.map((item: Attraction) => item.distict))];
    disticts.unshift(AppConstant.ALL_DISTICT);
    return disticts;
  }

  setAttractions(attractions: Attraction[]) {
    this.attractions = attractions;
    this.attractionsChanged$.next(this.getAttractions());
  }

  addAttractionsToFavoritesList(attractions: Attraction[]) {
    this.favoritesService.addFavoritesAttractions(ShareUtil.unselectedAttractions(attractions));
  }

  resetSelectState() {
    this.attractions = ShareUtil.unselectedAttractions(this.attractions);
    this.attractionsChanged$.next(this.getAttractions());
  }
}
