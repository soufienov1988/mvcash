import { Component } from '@angular/core';
import { ViewController ,App,NavParams,LoadingController, Loading} from 'ionic-angular';
import { NewItemPage } from '../new-item/new-item';
import { IndexPage } from '../index/index';
import { NouvelleAnnoncePage } from '../nouvelle-annonce/nouvelle-annonce';

import {Http} from '@angular/http';


@Component({
  template: `

<ion-content padding >
<ion-list><ion-list-header color="danger">{{item.titre}}</ion-list-header><ion-item-divider>
  
</ion-item-divider>
        <button  ion-button color="secondary" (click)="editItem()"  block ion-left outline>
		  <ion-icon name="create"></ion-icon>

<div style="padding-left:10px">		Modifier </div></button>     <div class="spacer" style="width:100%;height:10px;" id="login-spacer1"></div>

        <button ion-button  ion-left color="danger"(click)="removeItem()"  block outline>
		  <ion-icon name="alert"></ion-icon>
<div style="padding-left:10px">Supprimer</div></button>  <div class="spacer" style="width:100%;height:10px;" id="login-spacer1"></div>

      <button ion-button ion-left (click)="publishItem()" [hidden]="item.published==1" block outline>
	    <ion-icon name="eye"></ion-icon>
<div style="padding-left:10px">Publier</div></button>  <div class="spacer" style="width:100%;height:10px;" id="login-spacer1"></div>

     <button  ion-button ion-left (click)="unpublishItem()" [hidden]="item.published==0" block outline>
	   <ion-icon name="eye-off"></ion-icon>
<div style="padding-left:10px">Unpublier</div></button>  <div class="spacer" style="width:100%;height:10px;" id="login-spacer1"></div>

        <button ion-button ion-left block  (click)="dismiss()">
Annuler</button>

 </ion-list>
    
</ion-content>
`
})
export class ModalItemPage {
item;
annonce;
public loading ;

  constructor(
    public viewCtrl: ViewController,params: NavParams,public loadingCtrl: LoadingController,public appCtrl:App ,public http:Http) {
	//this.ctrl=<NavController>nav;
    this.item=params.get("item");
    this.annonce=params.get("annonce");
	this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  }
  removeItem(){
	  this.loading.present();
	  let removeUrl="http://socialapps.000webhostapp.com/remove.php?item=";
  this.http.get(removeUrl+this.item.id+"&photos="+this.item.photos)
      .map(res => res.json())
      .subscribe(
		(data) => this.viewCtrl.dismiss(this.item),
	  (error)=>alert("error")
	   )
	   }
  publishItem(){
	  this.loading.present();
  let publishUrl="http://socialapps.000webhostapp.com/publication.php?state=1&item=";
  this.http.get(publishUrl+this.item.id)
      .map(res => res.json())
      .subscribe(
		(data) => {this.item.published=1;this.loading.dismissAll();},
	  (error)=>{this.loading.dismissAll(); alert("error")})
		 }
  unpublishItem(){
	  this.loading.present();
  let publishUrl="http://socialapps.000webhostapp.com/publication.php?state=0&item=";
  this.http.get(publishUrl+this.item.id)
      .map(res => res.json())
      .subscribe(
	  (data) => {this.item.published=0;	this.loading.dismissAll();},
	  (error)=>{this.loading.dismissAll();alert("error")}
	  )
	  }
 
  
  editItem(){this.viewCtrl.dismiss();
 this.appCtrl.getRootNav().push(NewItemPage,{"annonce":this.annonce,"item":this.item}); this.viewCtrl.dismiss();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
}