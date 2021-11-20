import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as AppConstant from '../shared/model/app-constant';
import { Pagination } from '../shared/model/pagination.class';
import { AttractionsService } from './attractions.service';
import { Attraction } from './model/attraction.class';
import * as _ from 'lodash';

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.scss']
})
export class AttractionsComponent implements OnInit {
  attractions: Attraction[] = [];
  filteredAttractions: Attraction[] = [];
  filteredPageAttractions: Attraction[] = [];
  disticts: string[] = [];
  destory = new Subject();
  pagination = new Pagination();
  appConstant = AppConstant;

  selectedDistict: string = '';

  constructor(private attractionsService: AttractionsService) { }

  ngOnInit(): void {
    this.attractions = this.attractionsService.getAttractions();
    this.initAttractions();

    this.attractionsService.attractionsChanged$
      .pipe(takeUntil(this.destory))
      .subscribe((attractions: Attraction[]) => {
        this.attractions = attractions;
        this.initAttractions();
      })
  }

  selectDistict(distict: string) {
    this.selectedDistict = distict;
    this.pagination.resetPageStart();
    this.filteredAttractions = this.attractions.filter((item) => {
      if (this.selectedDistict !== this.appConstant.Common.ALL_DISTICT) {
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
      if (this.selectedDistict !== this.appConstant.Common.ALL_DISTICT) {
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
    this.selectDistict((this.selectedDistict ==='') ? this.appConstant.Common.ALL_DISTICT : this.selectedDistict);
    this.buildPageList(this.filteredAttractions);
    this.disticts = this.attractionsService.disticts;
    this.filterAttractions(this.filteredAttractions);
  }

  changePage(action: string, page: number = null) {
    this.pagination.alterPage(action, page);
    this.filterAttractions(this.filteredAttractions);
  }

  ngOnDestroy(): void {
    this.destory.next();
    this.destory.complete();
  }

  addFavorites() {
    const favorites = _.cloneDeep(this.filteredAttractions).filter((item: Attraction) => item.isSelected);
    this.attractionsService.addAttractionsToFavoritesList(favorites);
    this.attractionsService.resetSelectState();
  }

}
