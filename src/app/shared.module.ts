import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

//O NgModelé que não faz parte da biblioteca de códigos do Angular, 
// ela é definida na biblioteca do módulo de formulários, 
// portanto você precisa importar a FormsModulebiblioteca 
import { FormsModule } from '@angular/forms';

import {AntModule} from './app.antd.module';
import {MenuComponent} from '../core/components/menu/menu.component';
import {ListComponent} from '../core/components/list/list.component';

@NgModule({
  imports: [
    CommonModule, 
    AntModule,
    FormsModule
  ],
  declarations: [
    MenuComponent,
    ListComponent
  ],
  exports: [
    MenuComponent,
    ListComponent,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class SharedModule { }
