import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MotifPage } from './motif';

@NgModule({
  declarations: [
    MotifPage,
  ],
  imports: [
    IonicPageModule.forChild(MotifPage),
  ],
  exports: [
    MotifPage
  ]
})
export class MotifPageModule {}
