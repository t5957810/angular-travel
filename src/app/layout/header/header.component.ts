import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/component/modal/modal.component';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { PlaceholderDirective } from 'src/app/shared/directive/placeholder.directive';
import * as AppConstant from 'src/app/shared/model/app-constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  appConstant = AppConstant;

  menuList = [
    { label: this.appConstant.Common.ATTRACTION, routerLink: '/attractions' },
    { label: this.appConstant.Common.FAVORITES, routerLink: '/favorites' },
    { label: this.appConstant.Common.FETCH, routerLink: '' },
  ];
  closeSub$: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.onFetch();
  }

  onFetch() {
    this.dataStorageService.fetchAttractions().subscribe(() => {
    }, () => {
      this.showErrorAlert(this.appConstant.ErrorMessage.CORS_ERROR);
    });
  }

  private showErrorAlert(error: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.errorMessage = error;

    this.closeSub$ = componentRef.instance.close$.subscribe(() => {
      this.closeSub$.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    this.closeSub$.unsubscribe();
  }

}
