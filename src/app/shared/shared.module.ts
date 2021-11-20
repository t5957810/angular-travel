import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './directive/dropdown.directive';
import { SidenavDirective } from './directive/sidenav.directive';
import { ModalComponent } from './component/modal/modal.component';
import { PlaceholderDirective } from './directive/placeholder.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    SidenavDirective,
    ModalComponent,
    PlaceholderDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownDirective,
    SidenavDirective,
    PlaceholderDirective,
    ModalComponent
  ]
})
export class SharedModule { }
