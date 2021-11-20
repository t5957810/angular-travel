import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConstant, AttractionText } from 'src/app/shared/model/app-constant';
import { AttractionsService } from '../attractions.service';
import { Attraction } from '../model/attraction.class';
import * as _ from 'lodash';
import { Pagination } from 'src/app/shared/model/pagination.class';

@Component({
  selector: 'app-attraction-list',
  templateUrl: './attraction-list.component.html',
  styleUrls: ['./attraction-list.component.scss']
})
export class AttractionListComponent implements OnInit, OnDestroy {
  attractions: Attraction[] = [];
  filteredAttractions: Attraction[] = [];
  filteredPageAttractions: Attraction[] = [];
  disticts: string[] = [];
  attractionsSubscription$: Subscription;
  pagination = new Pagination();
  attractionText = AttractionText;

  selectedDistict = AppConstant.ALL_DISTICT;

  constructor(private attractionsService: AttractionsService) { }

  ngOnInit(): void {
    this.attractions = this.attractionsService.getAttractions();
    this.initAttractions();

    this.attractionsSubscription$ = this.attractionsService.attractionsChanged$
      .subscribe((attractions: Attraction[]) => {
        this.attractions = attractions;
        this.initAttractions();
      })
  }

  selectCounty(distict: string) {
    this.selectedDistict = distict;
    this.pagination.resetPageStart();
    this.filteredAttractions = this.attractions.filter((item) => {
      if (this.selectedDistict !== AppConstant.ALL_DISTICT) {
        return (item.distict === this.selectedDistict);
      }
      return item;
    });

    this.buildPageList(this.filteredAttractions);
    this.filterAttractions(this.filteredAttractions);
  }

  filterAttractions(attractions: Attraction[]) {
    const itemEnd = this.pagination.itemEnd;
    const itemStart = this.pagination.itemStart;

    this.filteredPageAttractions = attractions.filter((item, index) => {
      if (this.selectedDistict !== AppConstant.ALL_DISTICT) {
        return (item.distict === this.selectedDistict && index >= itemStart && index < itemEnd);
      }
      return (index >= itemStart && index < itemEnd);
    });
  }

  buildPageList(attractions: Attraction[]) {
    this.pagination.buildPageList(attractions);
  }

  initAttractions() {
    this.filteredAttractions = this.attractions;
    this.buildPageList(this.filteredAttractions);
    this.disticts = this.attractionsService.disticts;
    this.filterAttractions(this.filteredAttractions);
  }

  changePage(action: string, page: number = null) {
    this.pagination.alterPage(action, page);
    this.filterAttractions(this.filteredAttractions);
  }

  ngOnDestroy(): void {
    this.attractionsSubscription$.unsubscribe();
  }

  addFavorites() {
    const favorites = _.cloneDeep(this.filteredAttractions).filter((item: Attraction) => item.isSelected);
    this.attractionsService.addAttractionsToFavoritesList(favorites);
    this.attractionsService.resetSelectState();
  }
}
