import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import {UserProvider} from '../../providers/user/user';
import { NativeStorage } from '@ionic-native/native-storage';
import {Http} from '@angular/http';
import {Network} from "@ionic-native/network";

/**
 * Generated class for the PasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-password',
  templateUrl: 'password.html',
})
export class PasswordPage {
oldpassword;newpassword;confpassword;mypassword;loading;
  constructor(public navCtrl: NavController,private network: Network,public loadingCtrl: LoadingController,public userService:UserProvider, public nativeStorage:NativeStorage, public http:Http, public navParams: NavParams) {
  this.mypassword=this.userService.getUser().password;
  }
checkInternet():boolean{
	  if(<string>this.network.type=="none"||<string>this.network.type=="unknown")
		  return false;
	  else return true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordPage');
  }
confirmer(){
	if(this.oldpassword==this.mypassword)
	{if(this.newpassword==this.confpassword)
		{this.changePswd();}
	else alert("Erreur: verifiez le nouveau mot de passe !!")
	}
	else alert("erreur: le mot de passe actuel est faux !!")
	
}
changePswd(){if (this.checkInternet()){
	this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
this.loading.present();
let url="https://socialapps.000webhostapp.com/api/change_password/"+this.userService.getUser().email+"/"+this.newpassword;
this.http.get(url)
.map(res => res.json())
.subscribe(data=>{if(data=="200") alert("success, verfiez votre boite e-mail pour récupérer le nouveau mot de passe");
 else alert("une erreur c'est produite réessayez plus tard " );this.loading.dismiss();}
,error=>{alert(error);this.loading.dismiss();});} else alert("verifiez la connexion internet");


}
}
