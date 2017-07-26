import { Component } from '@angular/core';
import { ViewController ,App,NavParams,LoadingController, Loading} from 'ionic-angular';
import { NouvelleAnnoncePage } from '../nouvelle-annonce/nouvelle-annonce';
import { ItemsPage } from '../items/items';

import {Http} from '@angular/http';


@Component({
  template: `

<ion-content padding >
<ion-list><ion-list-header color="danger">{{annonce.titre}}</ion-list-header><ion-item-divider>
  
</ion-item-divider>
        <button  ion-button color="secondary" (click)="editAnnonce()"  block ion-left outline>
		  <ion-icon name="create"></ion-icon>

<div style="padding-left:10px">		Modifier </div></button>   <div class="spacer" style="width:100%;height:10px;" id="login-spacer1"></div>

		<button  ion-button ion-left color="secondary"(click)="items()" block  outline>
		  <ion-icon name="add-circle"></ion-icon>
<div style="padding-left:10px">Liste des elements </div></button>   <div class="spacer" style="width:100%;height:10px;" id="login-spacer1"></div>

        <button ion-button  ion-left color="danger"(click)="removeAnnonce()"  block outline>
		  <ion-icon name="alert"></ion-icon>
<div style="padding-left:10px">Supprimer</div></button>  <div class="spacer" style="width:100%;height:10px;" id="login-spacer1"></div>

      <button ion-button ion-left (click)="publishAnnonce()" [hidden]="annonce.published==1" block outline>
	    <ion-icon name="eye"></ion-icon>
<div style="padding-left:10px">Publier</div></button>  <div class="spacer" style="width:100%;height:10px;" id="login-spacer1"></div>

     <button  ion-button ion-left (click)="unpublishAnnonce()" [hidden]="annonce.published==0" block outline>
	   <ion-icon name="eye-off"></ion-icon>
<div style="padding-left:10px">Unpublier</div></button>  <div class="spacer" style="width:100%;height:10px;" id="login-spacer1"></div>

        <button ion-button ion-left block  (click)="dismiss()">
Annuler</button>

 </ion-list>
    
</ion-content>
`
})
export class ModalContentPage {
annonce;
public loading ;

  constructor(public viewCtrl: ViewController,params: NavParams,public loadingCtrl: LoadingController,public appCtrl: App, public http:Http ) {
    this.annonce=params.get("ann");
	this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  }
  removeAnnonce(){
	  this.loading.present();
  let removeUrl="http://socialapps.000webhostapp.com/remove.php?annonce=";
  this.http.get(removeUrl+this.annonce.id+"&photos="+this.annonce.photos)
      .map(res => res.json())
      .subscribe(
	  (data) =>{this.loading.dismissAll();this.viewCtrl.dismiss(this.annonce); },

	  (error)=>{this.loading.dismissAll(); alert("error")}
	   )
	   }
  publishAnnonce(){
	  this.loading.present();
  let publishUrl="http://socialapps.000webhostapp.com/publication.php?state=1&annonce=";
  this.http.get(publishUrl+this.annonce.id)
      .map(res => res.json())
      .subscribe(
	  (data) =>{this.annonce.published=1;this.loading.dismissAll(); },
	  (error)=>{this.loading.dismissAll(); alert("error")})
	   }
  unpublishAnnonce(){
	  this.loading.present();
  let publishUrl="http://socialapps.000webhostapp.com/publication.php?state=0&annonce=";
  this.http.get(publishUrl+this.annonce.id)
      .map(res => res.json())
      .subscribe(
	  (data) =>{this.annonce.published=0;this.loading.dismissAll(); },
	  (error)=>{this.loading.dismissAll();alert("error")})
	   }
  items(){    this.viewCtrl.dismiss();

   this.appCtrl.getRootNav().push(ItemsPage,{"annonce":this.annonce});
}
  
  editAnnonce(){

   this.appCtrl.getRootNav().push(NouvelleAnnoncePage,{"annonce":this.annonce}); this.viewCtrl.dismiss();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}