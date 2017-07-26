import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController ,ToastController} from 'ionic-angular';
import { ItemImagePage } from '../itemimage/itemimage';
import { Item } from './item';
import { ItemProvider,ItemData } from '../../providers/item/item';
import { File } from '@ionic-native/file';
import {Http} from '@angular/http';
import { ItemsPage } from '../items/items';
import {Network} from "@ionic-native/network";

import { Transfer , TransferObject} from '@ionic-native/transfer';
/**
 * Generated class for the NewItemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-item',
  templateUrl: 'new-item.html',
})
export class NewItemPage {  	url:string="https://socialapps.000webhostapp.com/api/items"

item:Item;annonce;itemdata:ItemData;loading;
  constructor(public navCtrl: NavController,private network: Network,public toastCtrl: ToastController,public http:Http,public loadingCtrl:LoadingController, public navParams: NavParams,private transfer: Transfer,
  private file: File,public itemprovider:ItemProvider) {
  this.item=this.navParams.get("item");
  this.itemdata=this.itemprovider.getItemData();
  this.annonce=this.navParams.get("annonce");
 // try{this.item=this.navParams.get("item");}catch(error){}
  this.item.annonce_id=this.annonce.id;
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  }
checkInternet():boolean{
	  if(<string>this.network.type=="none"||<string>this.network.type=="unknown")
		  return false;
	  else return true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewItemPage');
  }
  presentToast(message_) {
  let toast = this.toastCtrl.create({
    message: message_,
    duration: 3000,
    cssClass: 'danger',
    position: 'top'
  });toast.present();}
  validate():boolean{
	  if(!this.item.titre){this.presentToast("veuillez saisir un titre");return false;}
	  if(!this.item.description){this.presentToast("veuillez introduire une description");return false;}
	  if(!this.item.prix){this.presentToast("veuillez introduire le prix");return false;}
	  if(!this.item.categorie){this.presentToast("veuillez choisir une categorie");return false;}
	  return true;
  }
save(){if (this.checkInternet())
	{if(this.validate())this.recursiveUpload();} else alert("verifiez la connexion internet");
}
recursiveUpload(){var url = "https://socialapps.000webhostapp.com/upload.php";
var fn=this.itemdata.filenames.pop();
	var options = {
    fileKey: "file",
    fileName:fn ,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': fn}
  };
 if(this.itemdata.targets.length>0){
  const fileTransfer: TransferObject = this.transfer.create();
	fileTransfer.upload(this.itemdata.targets.pop(), url, options).then(data => {this.itemdata.paths.push(data.response);
		if(this.itemdata.targets.length>0)
		this.recursiveUpload();
	else {this.saveItem();
    }
  }, err => {
    this.loading.dismissAll()
    //this.presentToast('Error while uploading file.');
 });}
  else {this.saveItem();
    }
  }
saveItem(){
if(this.itemdata.removes.length>0)
{var query={q:this.itemdata.removes.join()};this.filterremotePaths();
this.http.post("https://socialapps.000webhostapp.com/remove_photo.php",JSON.stringify(query)).subscribe((res) => console.log("respond"+res.json()));}


this.itemdata.paths=this.itemdata.paths.concat(this.itemdata.remotePaths);
try{this.item.photos=this.itemdata.paths.join();}catch(error){this.loading.dismissAll();alert("paths error");}
 if(this.item.id){ //update
 this.http.post(this.url+"/"+this.item.id, this.item)
        .subscribe(data => {this.loading.dismissAll();this.navCtrl.setRoot(ItemsPage,{"annonce":this.annonce});
});
 }
 else
	 {//create
		 this.http.post(this.url, this.item)
        .subscribe(data => {this.loading.dismissAll();this.navCtrl.setRoot(ItemsPage,{"annonce":this.annonce});
});
 }
}
filterremotePaths(){
	var j;
	for(j=0;j<this.itemdata.removes.length;j++){
	var i = this.itemdata.remotePaths.indexOf(this.itemdata.removes[j]);
if(i != -1) {
	this.itemdata.remotePaths.splice(i, 1);
}
}
}
}
