import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TitrePage } from './titre';

@NgModule({
  declarations: [
    TitrePage,
  ],
  imports: [
    IonicPageModule.forChild(TitrePage),
  ],
  exports: [
    TitrePage
  ]
})
export class TitrePageModule {}
