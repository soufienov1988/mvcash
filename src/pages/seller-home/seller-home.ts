import { Component } from '@angular/core';
import { NavController,ModalController } from 'ionic-angular';
import { NouvelleAnnoncePage } from '../nouvelle-annonce/nouvelle-annonce';
import { Annonce} from '../nouvelle-annonce/annonce';
import { ItemsPage } from '../items/items';
import { ImagepickPage } from '../imagepick/imagepick';
import { AnnonceserviceProvider } from '../../providers/annonceservice/annonceservice';
import { Http } from '@angular/http';
import { AlertController,LoadingController, Loading  } from 'ionic-angular';
import { ModalContentPage } from './modalPage';
import {UserProvider} from '../../providers/user/user';
import {Network} from "@ionic-native/network";

@Component({
  selector: 'page-seller-home',
  templateUrl: 'seller-home.html'
})
export class SellerHomePage {
  loading: Loading;
offers:boolean=true;
mesAnnonces:any;user;
baseUrl:string="https://socialapps.000webhostapp.com/"

url="https://socialapps.000webhostapp.com/api/annonces/";
  constructor(public navCtrl: NavController,private network: Network,public modalCtrl: ModalController, public loadingCtrl: LoadingController,public userService:UserProvider,public annonceservice: AnnonceserviceProvider,public http: Http,private alertCtrl: AlertController) {
  this.user=this.userService.getUser();
  this.loading_();
  if (this.checkInternet())
  {this.loading.present(); 

  this.getAnnonces();}
   else alert("verifiez la connexion internet");

  }
  loading_(){this.loading = this.loadingCtrl.create({
    content: 'loading...',
  });}
  nouvelleAnnonce(){this.annonceservice.setAnnonce(new Annonce());
  this.navCtrl.push(ImagepickPage);
  }
 checkInternet():boolean{
	  if(<string>this.network.type=="none"||<string>this.network.type=="unknown")
		  return false;
	  else return true;
  }
  getAnnonces(){this.http.get(this.url+this.user.id)
      .map(res => res.json())
      .subscribe(data => {//alert(data);
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.mesAnnonces = data;
		if(!(this.mesAnnonces.length>0))this.offers=false;
		this.loading.dismissAll(); 

       
      },
	  error=>{this.loading.dismissAll(); });
	  
	  }
	  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
	this.getAnnonces();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 5000);
  }
  removeAnnonce(annonce){  if (this.checkInternet())
  {this.loading_();

	  this.loading.present();
  let removeUrl="http://socialapps.000webhostapp.com/api/remove/annonces/";
  this.http.get(removeUrl+annonce.id)
      .map(res => res.json())
      .subscribe(
	  (data) =>{this.loading.dismissAll();this.refreshList(annonce); },

	  (error)=>{this.loading.dismissAll(); alert("error 245")}
	   )
  }   else alert("verifiez la connexion internet");

  }
  publishAnnonce(annonce){ if (this.checkInternet())
  { this.loading_();

	  this.loading.present();
  let publishUrl="http://socialapps.000webhostapp.com/api/annonces/";
  this.http.get(publishUrl+annonce.id)
      .map(res => res.json())
      .subscribe(
	  (data) =>{annonce.published=1;this.loading.dismissAll(); },
  (error)=>{this.loading.dismissAll(); alert("error")})}   else alert("verifiez la connexion internet");

	   }
  unpublishAnnonce(annonce){ if (this.checkInternet())
  { this.loading_();

	  this.loading.present();
  let publishUrl="http://socialapps.000webhostapp.com/publication.php?state=0&annonce=";
  this.http.get(publishUrl+annonce.id)
      .map(res => res.json())
      .subscribe(
	  (data) =>{annonce.published=0;this.loading.dismissAll(); },
  (error)=>{this.loading.dismissAll();alert("error")})}   else alert("verifiez la connexion internet");

	   }
  items(annonce){   
this.annonceservice.setAnnonce(annonce);
   this.navCtrl.push(ItemsPage,{"annonce":annonce});
}
  
  editAnnonce(annonce){
this.annonceservice.setAnnonce(annonce);

   this.navCtrl.push(ImagepickPage); 
  }
   refreshList(item){
  var index = this.mesAnnonces.indexOf(item);
	 if (index > -1) {
    this.mesAnnonces.splice(index, 1);
}
}
  getImage(item){let rv="default-placeholder.png";
	  let str=<string>item.photos;
		try{let remotePaths=str.split(","); 
		if(remotePaths.length>0){
		rv= remotePaths[0];}}catch(error){return rv;}
		
			 
		
	return this.baseUrl+rv;
	  
  }
}
