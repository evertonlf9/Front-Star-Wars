import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { CharacterComponent } from '../components/character/character.component';
import { HomeComponent } from '../components/home/home.component';
import { DetailComponent } from '../components/detail/detail.component';
import { SpeciesComponent } from '../components/species/species.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'character', component: CharacterComponent },
  { path: 'details/:type/:id', component: DetailComponent },
  { path: 'species', component: SpeciesComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports:[RouterModule]
})
export class RoutingModule { }
