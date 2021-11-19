import { Directive, ElementRef, HostBinding, HostListener, Renderer2, ViewChild } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
	exportAs: 'appDropdown' 

})
export class DropdownDirective {
  // dropdown 是否開啟
  @HostBinding('class.show') isDropdownOpen = false;

  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event']) showDropdown(event: Event) {
    this.isDropdownOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isDropdownOpen : false;
  }
}
