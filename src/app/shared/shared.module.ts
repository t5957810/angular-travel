import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownDirective } from './directive/dropdown.directive';
import { TableComponent } from './component/table/table.component';

@NgModule({
  declarations: [
    DropdownDirective,
    TableComponent
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
    DropdownDirective
  ]
})
export class SharedModule { }
