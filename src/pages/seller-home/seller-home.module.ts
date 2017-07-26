import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SellerHomePage } from './seller-home';

@NgModule({
  declarations: [
    SellerHomePage,
  ],
  imports: [
    IonicPageModule.forChild(SellerHomePage),
  ],
  exports: [
    SellerHomePage
  ]
})
export class SellerHomePageModule {}
