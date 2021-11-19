import { NgModule } from '@angular/core';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from './attractions.component';
import { SharedModule } from '../shared/shared.module';
import { AttractionListComponent } from './attraction-list/attraction-list.component';

@NgModule({
  declarations: [
    AttractionsComponent,
    AttractionListComponent
  ],
  imports: [
    SharedModule,
    AttractionsRoutingModule
  ],
})
export class AttractionsModule { }
