import { NgModule, Directive, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../app/shared.module';
import { PlanetComponent } from './planet.component';
import { PlanetService } from './planet.service';


@NgModule({
  declarations: [
    PlanetComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [PlanetService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [PlanetComponent]
})
export class PlanetModule { }