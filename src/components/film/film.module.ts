import { NgModule, Directive, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../app/shared.module';
import { FilmComponent } from './film.component';
import { FilmService } from './film.service';


@NgModule({
  declarations: [
    FilmComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [FilmService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [FilmComponent]
})
export class FilmModule { }