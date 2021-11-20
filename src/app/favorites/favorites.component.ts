import { FavoritesService } from './favorites.service';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Attraction } from '../attractions/model/attraction.class';
import { Subscription } from 'rxjs';
import { Pagination } from '../shared/model/pagination.class';
import { AppConstant, AttractionText } from '../shared/model/app-constant';
import { ModalComponent } from '../shared/component/modal/modal.component';
import { PlaceholderDirective } from '../shared/directive/placeholder.directive';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  title = AppConstant.FAVORITES;
  favoritesAttractions: Attraction[] = [];
  filteredAttractions: Attraction[] = [];
  filteredPageAttractions: Attraction[] = [];

  @ViewChild(PlaceholderDirective) modalHost: PlaceholderDirective;
  closeSub$: Subscription;

  favoritesAttractionsSubscription$: Subscription;
  pagination = new Pagination();
  attractionText = AttractionText;

  constructor(
    private favoritesService: FavoritesService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

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

  onEdit(attraction: Attraction, index: number) {
    const modalComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const hostViewContainerRef = this.modalHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(modalComponentFactory);
    componentRef.instance.formData = attraction;

    this.closeSub$ = componentRef.instance.close$.subscribe((formData: Attraction) => {
      if (formData) {
        const itemEnd = this.pagination.itemEnd;
        const itemStart = this.pagination.itemStart;
        console.log(itemStart, ', ', itemEnd)
        const realIndex = index + itemStart;
        console.log('realIndex= ', realIndex)

        this.favoritesService.updateFavoritesAttraction(realIndex, formData);
      }
      this.closeSub$.unsubscribe();
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
