import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/component/modal/modal.component';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { PlaceholderDirective } from 'src/app/shared/directive/placeholder.directive';
import * as AppConstant from 'src/app/shared/model/app-constant';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  destory = new Subject();

  constructor(
    private dataStorageService: DataStorageService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit(): void {
    this.onFetch();
  }

  onFetch() {
    this.dataStorageService.fetchAttractions().subscribe(() => {
      this.showAlert(this.appConstant.Common.GET_DATA, true);
    }, () => {
      this.showAlert(this.appConstant.ErrorMessage.CORS_ERROR);
    });
  }

  private showAlert(message: string, autoClose = false) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.errorMessage = message;

    if (autoClose) {
      setTimeout(() => {
        hostViewContainerRef.clear();
      }, 2000);
    }

    componentRef.instance.close$.pipe(takeUntil(this.destory)).subscribe(() => {
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    this.destory.next();
    this.destory.complete();
  }

}
