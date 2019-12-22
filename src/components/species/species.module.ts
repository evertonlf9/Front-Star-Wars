import { NgModule, Directive, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../app/app.material.module';
import { SpeciesComponent } from './species.component';
import { SpeciesService } from './species.service';

import { SharedModule } from '../../app/shared.module';

@NgModule({
  declarations: [
    SpeciesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  providers: [SpeciesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [SpeciesComponent]
})
export class SpeciesModule { }