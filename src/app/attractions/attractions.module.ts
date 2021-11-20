import { NgModule } from '@angular/core';

import { AttractionsRoutingModule } from './attractions-routing.module';
import { AttractionsComponent } from './attractions.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AttractionsComponent
  ],
  imports: [
    SharedModule,
    AttractionsRoutingModule
  ],
})
export class AttractionsModule { }
