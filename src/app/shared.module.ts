import { NgModule} from '@angular/core';

import {MenuComponent} from '../core/components/menu/menu.component'
@NgModule({
  declarations: [
    MenuComponent
  ],
  exports: [
    MenuComponent
  ]
})
export class SharedModule { }
