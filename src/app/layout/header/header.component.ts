import { ModalService } from './../../shared/component/modal/modal.service';
import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/shared/component/modal/modal.component';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { PlaceholderDirective } from 'src/app/shared/directive/placeholder.directive';
import { AppConstant, ErrorMessage } from 'src/app/shared/model/app-constant';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  menuList = [
    { label: AppConstant.ATTRACTION, routerLink: '/attractions' },
    { label: AppConstant.FAVORITES, routerLink: '/favorites' },
    { label: AppConstant.FETCH, routerLink: '' },
  ];
  closeSub$: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.onFetch();
  }

  onFetch() {
    this.dataStorageService.fetchAttractions().subscribe(() => {
    }, () => {
      this.showErrorAlert(ErrorMessage.CORS_ERROR);
    });
  }

  private showErrorAlert(error: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.errorMessage = error;

    this.closeSub$ = componentRef.instance.close$.subscribe((data) => {
      this.closeSub$.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {

  }

}
