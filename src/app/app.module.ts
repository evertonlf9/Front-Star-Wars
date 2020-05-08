import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { pt_PT } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';

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

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    RoutingModule,
    HomeModule,
    CharacterModule,
    DetailModule,
    SpeciesModule,
    PlanetModule,
    StarshipModule,
    VehicleModule,
    FilmModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: pt_PT }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
