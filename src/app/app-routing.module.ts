import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttractionsResolver } from './attractions/attractions.resolver';

const routes: Routes = [
  {
    path: '', redirectTo: 'attractions',  pathMatch: 'full' 
  },
  {
    path: 'attractions', loadChildren: () => import('./attractions/attractions.module')
      .then(m => m.AttractionsModule), resolve: [AttractionsResolver]
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
