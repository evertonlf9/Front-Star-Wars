import { NgModule, Directive, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../app/shared.module';
import { CharacterComponent } from './character.component';
import { CharacterService } from './character.service';


@NgModule({
  declarations: [
    CharacterComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [CharacterService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [CharacterComponent]
})
export class CharacterModule { }