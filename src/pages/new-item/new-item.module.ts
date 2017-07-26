import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewItemPage } from './new-item';

@NgModule({
  declarations: [
    NewItemPage,
  ],
  imports: [
    IonicPageModule.forChild(NewItemPage),
  ],
  exports: [
    NewItemPage
  ]
})
export class NewItemPageModule {}
