import { NgModule } from '@angular/core';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    FavoritesComponent
  ],
  imports: [
    SharedModule,
    FavoritesRoutingModule
  ]
})
export class FavoritesModule { }
