import { Component } from '@angular/core';
import { NavController,NavParams ,ToastController ,LoadingController} from 'ionic-angular';
import {Annonce} from './annonce';
import {Http} from '@angular/http';
import {UserProvider} from '../../providers/user/user';
import { TitrePage } from '../titre/titre';
import { MotifPage } from '../motif/motif';
import { LocalPage } from '../local/local';
import { PayementPage } from '../payement/payement';
import { AdressePage } from '../adresse/adresse';
import { SellerHomePage } from '../seller-home/seller-home';
import { CategoriePage } from '../categorie/categorie';
import { AnnonceserviceProvider } from '../../providers/annonceservice/annonceservice';
import { AnnonceData } from '../../providers/annonceservice/annonceservice';
import { ImagepickPage } from '../imagepick/imagepick';
import { AlertController } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { Transfer , TransferObject} from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import {Network} from "@ionic-native/network";

@Component({
  selector: 'page-nouvelle-annonce',
  templateUrl: 'nouvelle-annonce.html'
})
export class NouvelleAnnoncePage {
	user:any;
	cats:string;
	save_url:string="https://socialapps.000webhostapp.com/api/annonces"

pages = {
      
       'TitrePage':TitrePage,
       'MotifPage':MotifPage,
       'LocalPage':LocalPage,
       'CategoriePage':CategoriePage,
       'AdressePage':AdressePage,
       'PayementPage':PayementPage,
       'ImagepickPage':ImagepickPage
      
    }; 
	annonce :Annonce;annoncedata:AnnonceData;
	loading;
  constructor(public userService:UserProvider,private network: Network, public toastCtrl: ToastController,public navCtrl: NavController,  public loadingCtrl:LoadingController,private transfer: Transfer, private file: File, private filePath: FilePath,public annonceservice: AnnonceserviceProvider,public http:Http,private alertCtrl: AlertController) {
  this.user=this.userService.getUser();
    
	this.annonce=this.annonceservice.getAnnonce();
	this.annoncedata=this.annonceservice.getData();
  this.annonce.user_id=this.user.id;
   this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  }
  presentToast(message_) {
  let toast = this.toastCtrl.create({
    message: message_,
    duration: 3000,
    cssClass: 'danger',
    position: 'top'
  });toast.present();}
  validate():boolean{
	  if(!this.annonce.titre){this.presentToast("veuillez saisir un titre");return false;}
	  if(!this.annonce.local){this.presentToast("veuillez choisir un local");return false;}
	  if(!this.annonce.motif){this.presentToast("veuillez choisir un motif");return false;}
	  if(!this.annonce.adresse){this.presentToast("veuillez saisir une adresse");return false;}
	  if(!this.annonce.payement){this.presentToast("veuillez choisir la modalité de payement");return false;}
	  if(!this.annonce.categorie){this.presentToast("veuillez choisir les categories");return false;}
	  return true;
  }
  save() {if (this.checkInternet())
	  {if(this.validate())
{ this.annonceservice.setAnnonce(this.annonce);this.loading.present();
	  this.recursiveUpload();}} else alert("verifiez la connexion internet");

    
	
	
  }
  goto(destination){this.navCtrl.push(this.pages[destination]);}
checkInternet():boolean{
	  if(<string>this.network.type=="none"||<string>this.network.type=="unknown")
		  return false;
	  else return true;
  }  
 saveAnnonce(){
if(this.annoncedata.removes.length>0)
{var query={q:this.annoncedata.removes.join()};this.filterremotePaths();
this.http.post("https://socialapps.000webhostapp.com/remove_photo.php",JSON.stringify(query)).subscribe((res) => console.log("respond"+res.json()));}


this.annoncedata.paths=this.annoncedata.paths.concat(this.annoncedata.remotePaths);
try{this.annonce.photos=this.annoncedata.paths.join();}catch(error){console.log("paths error");}
if(this.annonce.id){
  return this.http.post(this.save_url+"/"+this.annonce.id, this.annonce)
        .subscribe(data => {this.loading.dismissAll();this.navCtrl.setRoot(SellerHomePage);//return value here
});}
else {
return this.http.post(this.save_url, this.annonce)
        .subscribe(data => {this.loading.dismissAll();this.navCtrl.setRoot(SellerHomePage);
});
}
}
recursiveUpload(){var url = "https://socialapps.000webhostapp.com/upload.php";
var fn=this.annoncedata.filenames.pop();var rt;
	var options = {
    fileKey: "file",
    fileName:fn ,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': fn}
  };
 if(this.annoncedata.targets.length>0){
  const fileTransfer: TransferObject = this.transfer.create();
	fileTransfer.upload(this.annoncedata.targets.pop(), url, options).then(data => {this.annoncedata.paths.push(data.response);
		if(this.annoncedata.targets.length>0)
		this.recursiveUpload();
	else {this.saveAnnonce();
    }
  }, err => {return -1; //fail
   
 });}
  else {this.saveAnnonce();
    }
  }
filterremotePaths(){var j;
	for(j=0;j<this.annoncedata.removes.length;j++){
	var i = this.annoncedata.remotePaths.indexOf(this.annoncedata.removes[j]);
if(i != -1) {
	this.annoncedata.remotePaths.splice(i, 1);
}
}
}
}
