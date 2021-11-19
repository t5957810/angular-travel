import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppConstant } from 'src/app/shared/model/app-constant';
import { AttractionsService } from '../attractions.service';
import { Attraction } from '../model/attraction.class';

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


  totalPage: number = 0;    // 總共有幾頁
  pageList: number[] = [];  // 分頁總頁數陣列
  eachPage: number = 5;     // 每一頁顯示的筆數
  pageStart: number = 1;    // 起始頁

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
    this.pageStart = 1;
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
    const itemEnd = this.eachPage * this.pageStart;
    const itemStart = (itemEnd - this.eachPage) < 0 ? 0 : itemEnd - this.eachPage;

    this.filteredPageAttractions = attractions.filter((item, index) => {
      if(this.selectedCounty !== AppConstant.ALL_COUNTRY) {
        return (item.The_county === this.selectedCounty && index >= itemStart && index < itemEnd);
      }
      return (index >= itemStart && index < itemEnd);
    });
  }

  buildPageList(attractions: Attraction[]) {
    this.pageList = [];
    this.totalPage = Math.ceil((attractions.length / this.eachPage));
    for (let i = 1; i <= this.totalPage; i++) {
      this.pageList.push(i);
    }
  }

  initAttractions() {
    this.filteredAttractions = this.attractions;
    this.buildPageList(this.filteredAttractions);
    this.countys = this.attractionsService.countys;
    this.filterAttractions(this.filteredAttractions);
  }

  changePage(action: string, page: number= null) {
    if (action ==='previous') {
      if(this.pageStart === 1) {
        return;
      }
      this.pageStart--;
    }
    if (action ==='next') {
      if(this.pageStart === this.totalPage) {
        return;
      }
      this.pageStart++;
    }
    if (action ==='change') {
      this.pageStart = page;
    }

    this.filterAttractions(this.filteredAttractions);
  }

  ngOnDestroy(): void {
    this.attractionsSubscription$.unsubscribe();
  }

}
