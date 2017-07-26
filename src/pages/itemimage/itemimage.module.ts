import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemImagePage } from './itemimage';

@NgModule({
  declarations: [
    ItemImagePage,
  ],
  imports: [
    IonicPageModule.forChild(ItemImagePage),
  ],
  exports: [
    ItemImagePage
  ]
})
export class ItemImagePageModule {}
