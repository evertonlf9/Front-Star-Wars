import { NgModule, Directive, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListComponent } from './list.component';
import { ListService } from './list.service';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [ListService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [ListComponent]
})
export class ListModule { }