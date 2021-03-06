import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../app/shared.module';

import { DetailComponent } from './detail.component';
import { DetailService } from './detail.service';

@NgModule({
  declarations: [
    DetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [DetailService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [DetailComponent]
})
export class DetailModule { }