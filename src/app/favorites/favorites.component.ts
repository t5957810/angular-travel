import { FavoritesService } from './favorites.service';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Attraction } from '../attractions/model/attraction.class';
import { Subject } from 'rxjs';
import { Pagination } from '../shared/model/pagination.class';
import * as AppConstant from '../shared/model/app-constant';
import { ModalComponent } from '../shared/component/modal/modal.component';
import { PlaceholderDirective } from '../shared/directive/placeholder.directive';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  appConstant = AppConstant;
  title = this.appConstant.Common.FAVORITES;
  favoritesAttractions: Attraction[] = [];
  filteredAttractions: Attraction[] = [];
  filteredPageAttractions: Attraction[] = [];

  @ViewChild(PlaceholderDirective) modalHost: PlaceholderDirective;

  destory = new Subject();
  pagination = new Pagination();

  constructor(
    private favoritesService: FavoritesService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.favoritesAttractions = this.favoritesService.getFavoritesAttractions();
    this.initAttractions();

    this.favoritesService.favoritesAttractionsChanged$
      .pipe(takeUntil(this.destory))
      .subscribe((attractions: Attraction[]) => {
        this.favoritesAttractions = attractions;
        this.initAttractions();
      })
  }

  ngOnDestroy() {
    this.destory.next();
    this.destory.complete();
  }

  onEdit(attraction: Attraction, index: number) {
    const modalComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const hostViewContainerRef = this.modalHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(modalComponentFactory);
    componentRef.instance.formData = attraction;

    componentRef.instance.close$.pipe(takeUntil(this.destory)).subscribe((formData: Attraction) => {
      if (formData) {
        const itemStart = this.pagination.itemStart;
        const realIndex = index + itemStart;
        this.favoritesService.updateFavoritesAttraction(realIndex, formData);
      }
      hostViewContainerRef.clear();
    });
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

  changePage(action: string, page: number = null) {
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
