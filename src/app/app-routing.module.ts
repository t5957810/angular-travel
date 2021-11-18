import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: 'attractions',  pathMatch: 'full' 
  },
  {
    path: 'attractions', loadChildren: () => import('./attractions/attractions.module')
      .then(m => m.AttractionsModule)
  },
  {
    path: 'favorites', loadChildren: () => import('./favorites/favorites.module')
      .then(m => m.FavoritesModule)
  },
  { path: '**', redirectTo: 'attractions', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
