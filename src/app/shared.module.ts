import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MaterialModule} from './app.material.module';
import {MenuComponent} from '../core/components/menu/menu.component';
import {ListComponent} from '../core/components/list/list.component';

@NgModule({
  imports: [
    CommonModule, 
    MaterialModule
  ],
  declarations: [
    MenuComponent,
    ListComponent
  ],
  exports: [
    MenuComponent,
    ListComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule { }
