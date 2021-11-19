import { NgModule } from '@angular/core';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from './attractions.component';
import { SharedModule } from '../shared/shared.module';
import { AttractionListComponent } from './attraction-list/attraction-list.component';
import { AttractionItemComponent } from './attraction-item/attraction-item.component';

@NgModule({
  declarations: [
    AttractionsComponent,
    AttractionListComponent,
    AttractionItemComponent
  ],
  imports: [
    SharedModule,
    AttractionsRoutingModule
  ],
})
export class AttractionsModule { }
