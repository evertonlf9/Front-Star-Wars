import { NgModule} from '@angular/core';
import { 
  NzInputModule,
  NzSpinModule,
  NzIconModule,
  NzButtonModule,
  NzPaginationModule  
} from 'ng-zorro-antd';

@NgModule({
  imports: [
    NzInputModule,
    NzSpinModule,
    NzIconModule,
    NzButtonModule,
    NzPaginationModule
  ],
  exports: [
    NzInputModule,
    NzSpinModule,
    NzIconModule,
    NzButtonModule,
    NzPaginationModule
  ],
  providers: []
})
export class AntModule { }
