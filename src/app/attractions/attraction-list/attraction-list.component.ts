import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/shared/model/app-constant';
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
  countys: string[] = [];
  attractionsSubscription$: Subscription;
  pagination = new Pagination();


  selectedCounty = AppConstant.ALL_COUNTRY;

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

  selectCounty(county: string) {
    this.selectedCounty = county;
    this.pagination.resetPageStart();
    this.filteredAttractions = this.attractions.filter((item) => {
      if(this.selectedCounty !== AppConstant.ALL_COUNTRY) {
        return (item.The_county === this.selectedCounty);
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
      if(this.selectedCounty !== AppConstant.ALL_COUNTRY) {
        return (item.The_county === this.selectedCounty && index >= itemStart && index < itemEnd);
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
    this.countys = this.attractionsService.countys;
    this.filterAttractions(this.filteredAttractions);
  }

  changePage(action: string, page: number= null) {
    this.pagination.alterPage(action, page);
    this.filterAttractions(this.filteredAttractions);
  }

  ngOnDestroy(): void {
    this.attractionsSubscription$.unsubscribe();
  }

  addFavorites() {
    const favorites = _.cloneDeep(this.filteredAttractions).filter((item: Attraction) => item.isSelected);
    this.attractionsService.addAttractionsToFavoritesList(favorites);
  }

}
