import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appSidenav]',
  exportAs: 'appSidenav'
})
export class SidenavDirective {
  @HostBinding('class.show') isSidenavOpen = false;

  constructor(private elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event']) clickOutside(event: Event) {
    this.isSidenavOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isSidenavOpen : false;
  }

}
