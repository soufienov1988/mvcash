import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdressePage } from './adresse';

@NgModule({
  declarations: [
    AdressePage,
  ],
  imports: [
    IonicPageModule.forChild(AdressePage),
  ],
  exports: [
    AdressePage
  ]
})
export class AdressePageModule {}
