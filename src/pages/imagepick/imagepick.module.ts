import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImagepickPage } from './imagepick';

@NgModule({
  declarations: [
    ImagepickPage,
  ],
  imports: [
    IonicPageModule.forChild(ImagepickPage),
  ],
  exports: [
    ImagepickPage
  ]
})
export class ImagepickPageModule {}
