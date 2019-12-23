import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CharacterComponent } from '../components/character/character.component';
import { HomeComponent } from '../components/home/home.component';
import { DetailComponent } from '../components/detail/detail.component';
import { SpeciesComponent } from '../components/species/species.component';
import { PlanetComponent } from '../components/planet/planet.component';
import { StarshipComponent } from '../components/starship/starship.component';
import { VehiclesComponent } from '../components/vehicles/vehicles.component';
import { FilmComponent } from '../components/film/film.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'character', component: CharacterComponent },
  { path: 'details/:type/:id', component: DetailComponent, runGuardsAndResolvers: 'paramsChange' },
  { path: 'species', component: SpeciesComponent },
  { path: 'planets', component: PlanetComponent },
  { path: 'starships', component: StarshipComponent },
  { path: 'vehicles', component: VehiclesComponent },
  { path: 'films', component: FilmComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [
    // RouterModule.forRoot(appRoutes),
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
    CommonModule
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
