import { NgModule, Directive, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../app/shared.module';
import { StarshipComponent } from './starship.component';
import { StarshipService } from './starship.service';


@NgModule({
  declarations: [
    StarshipComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [StarshipService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [StarshipComponent]
})
export class StarshipModule { }