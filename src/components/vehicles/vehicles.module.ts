import { NgModule, Directive, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../app/shared.module';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesService } from './vehicles.service';


@NgModule({
  declarations: [
    VehiclesComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [VehiclesService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  bootstrap: [VehiclesComponent]
})
export class VehicleModule { }