import { Component } from '@angular/core';
import { IonicPage, NavController,ModalController, NavParams } from 'ionic-angular';
import { ItemImagePage } from '../itemimage/itemimage';
import { Item } from '../new-item/item';
import { Http } from '@angular/http';
import { AlertController,LoadingController, Loading  } from 'ionic-angular';
import { ModalItemPage } from './modalPage';
import {Annonce} from '../nouvelle-annonce/annonce';
import { AnnonceserviceProvider } from '../../providers/annonceservice/annonceservice';
import {Network} from "@ionic-native/network";

/**
 * Generated class for the ItemsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-items',
  templateUrl: 'items.html',
})
export class ItemsPage {
items:any;
annonce:Annonce; 
url:string="https://socialapps.000webhostapp.com/api/items/";;
loading: Loading;
offers:boolean=false;
  constructor (public navCtrl: NavController,private network: Network,public modalCtrl: ModalController,public annonceservice:AnnonceserviceProvider, public loadingCtrl: LoadingController, public np:NavParams,public http: Http,private alertCtrl: AlertController) {
  this.annonce=this.annonceservice.getAnnonce();
  this.loading = this.loadingCtrl.create({
    content: 'loading...',
  });
  if (this.checkInternet())
  {this.loading.present();
  this.getItems();  }
     else alert("verifiez la connexion internet");

}
checkInternet():boolean{
	  if(<string>this.network.type=="none"||<string>this.network.type=="unknown")
		  return false;
	  else return true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsPage');
  }
  getItems(){this.http.get(this.url+this.annonce.id)
      .map(res => res.json())
      .subscribe(data => {//alert(data);
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.items = data;
		//this.offers=(this.mesAnnonces.length>0);
		this.loading.dismissAll(); 

       
      },
	  error=>{this.loading.dismissAll(); });}
	  
	   doRefresh(refresher) {
    console.log('Begin async operation', refresher);
	this.getItems();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  
   
	 newItem(){
  this.navCtrl.push(ItemImagePage,{"item":new Item(),"annonce":this.annonce});
  }
  removeItem(item){
	  this.loading.present();
	  let removeUrl="http://socialapps.000webhostapp.com/api/items/";
  this.http.delete(removeUrl+item.id)
      .map(res => res.json())
      .subscribe(
		(data) => this.refreshList(item),
	  (error)=>alert("error")
	   );this.loading.dismissAll(); 

	   }
  publishItem(item){
	  this.loading.present();
  let publishUrl="http://socialapps.000webhostapp.com/api/items/";
  this.http.put(publishUrl+item.id,{state:"1"})
      .map(res => res.json())
      .subscribe(
		(data) => {item.published=1;this.loading.dismissAll();},
	  (error)=>{this.loading.dismissAll(); alert("error")})
		 }
  unpublishItem(item){
	  this.loading.present();
  let publishUrl="http://socialapps.000webhostapp.com/api/items/";
  this.http.put(publishUrl+item.id,{state:"0"})
      .map(res => res.json())
      .subscribe(
	  (data) => {item.published=0;	this.loading.dismissAll();},
	  (error)=>{this.loading.dismissAll();alert("error")}
	  )
	  }
 
  
  editItem(item){
 this.navCtrl.push(ItemImagePage,{"annonce":this.annonce,"item":item}); 
  }
  refreshList(item){
  var index = this.items.indexOf(item);
	 if (index > -1) {
    this.items.splice(index, 1);
}
}
}
