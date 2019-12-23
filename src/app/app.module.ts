import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';

import { MaterialModule } from './app.material.module';
import { RoutingModule } from './app.routing.module';

import { AppComponent } from './app.component';

import { HomeModule } from '../components/home/home.module';
import { CharacterModule } from '../components/character/character.module';
import { DetailModule } from '../components/detail/detail.module';
import { SpeciesModule } from '../components/species/species.module';
import { PlanetModule } from '../components/planet/planet.module';
import { StarshipModule } from '../components/starship/starship.module';
import { VehicleModule } from '../components/vehicles/vehicles.module';
import { FilmModule } from '../components/film/film.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxSpinnerModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    NgxSpinnerModule,
    ToastrModule,
    RoutingModule,
    HomeModule,
    CharacterModule,
    DetailModule,
    SpeciesModule,
    PlanetModule,
    StarshipModule,
    VehicleModule,
    FilmModule,

    ToastrModule.forRoot(
      {
        timeOut: 10000,
        positionClass: 'toast-top-center',
        preventDuplicates: true,
        closeButton: true,
        progressBar: true
      }
    ),
  ],
  exports: [
    MaterialModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
