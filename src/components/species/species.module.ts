import { NgModule, Directive, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpeciesComponent } from './species.component';
import { SpeciesService } from './species.service';

@NgModule({
  declarations: [
    SpeciesComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [SpeciesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [SpeciesComponent]
})
export class SpeciesModule { }