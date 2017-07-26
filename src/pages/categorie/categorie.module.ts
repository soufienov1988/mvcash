import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoriePage } from './categorie';

@NgModule({
  declarations: [
    CategoriePage,
  ],
  imports: [
    IonicPageModule.forChild(CategoriePage),
  ],
  exports: [
    CategoriePage
  ]
})
export class CategoriePageModule {}
