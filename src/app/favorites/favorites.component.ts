import { FavoritesService } from './favorites.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Attraction } from '../attractions/model/attraction.class';
import { Subscription } from 'rxjs';
import { Pagination } from '../shared/model/pagination.class';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoritesAttractions: Attraction[] = [];
  filteredAttractions: Attraction[] = [];
  filteredPageAttractions: Attraction[] = [];

  favoritesAttractionsSubscription$: Subscription;
  pagination = new Pagination();

  constructor(private favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.favoritesAttractions = this.favoritesService.getFavoritesAttractions();
    this.initAttractions();

    this.favoritesAttractionsSubscription$ = this.favoritesService.favoritesAttractionsChanged$
      .subscribe((attractions: Attraction[]) => {
        this.favoritesAttractions = attractions;
        this.initAttractions();
      })
  }

  ngOnDestroy() {
    this.favoritesAttractionsSubscription$.unsubscribe();
  }

  initAttractions() {
    this.filteredAttractions = this.favoritesAttractions;
    this.buildPageList(this.filteredAttractions);
    this.filterAttractions(this.filteredAttractions);
  }

  buildPageList(attractions: Attraction[]) {
    this.pagination.buildPageList(attractions);
  }

  filterAttractions(attractions: Attraction[]) {
    const itemEnd = this.pagination.itemEnd;
    const itemStart = this.pagination.itemStart;

    this.filteredPageAttractions = attractions.filter((item, index) => {
      return (index >= itemStart && index < itemEnd);
    });
  }

  changePage(action: string, page: number= null) {
    this.pagination.alterPage(action, page);
    this.filterAttractions(this.filteredAttractions);
  }

  onClear() {
    this.favoritesService.clearLocalStorage();
  }

  onRemoveFavoritesAttractions() {
    this.favoritesService.removeFavoritesAttractions();
  }

}
