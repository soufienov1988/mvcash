import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {Http} from '@angular/http';
import {User} from './user';
import { NativeStorage } from '@ionic-native/native-storage';
import { Validators, FormControl, FormGroup} from '@angular/forms'
import {UserProvider} from '../../providers/user/user';
import {Network} from "@ionic-native/network";

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
name:string;
lname:string;
email:string;
id:string;
password:string;
user:User;
public loading ;
signupForm:FormGroup;
url="https://socialapps.000webhostapp.com/signup.php";
  constructor(public navCtrl: NavController,private network: Network,public userService:UserProvider,public nativeStorage:NativeStorage, public http:Http,public loadingCtrl: LoadingController) {
  this.signupForm=new FormGroup({
		
		name: new FormControl('',  Validators.compose([
			Validators.required,
			Validators.pattern('[a-zA-Z ]*')
		])),
		lastname: new FormControl('',  Validators.compose([
			Validators.required,
			Validators.pattern('[a-zA-Z ]*')
		])),
		email: new FormControl('', Validators.compose([
			Validators.required,
			Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
		])),
		
		password: new FormControl('', Validators.compose([
			Validators.required]))
	});

  
  this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  }
checkInternet():boolean{
	  if(<string>this.network.type=="none"||<string>this.network.type=="unknown")
		  return false;
	  else return true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
signup(){if (this.checkInternet()){
if(this.signupForm.valid)
{this.id=this.email;
let user2={name:this.name,lname:this.lname,email:this.email,id:this.id,password:this.password,picture:"nope"};
this.saveUser(user2);}} else alert("verifiez la connexion internet");

}
saveUser(user:any){
this.loading.present();
this.http.post(this.url, JSON.stringify(user))
        .subscribe(data => {if(data['_body']=="1") {this.loading.dismiss();alert("this email is already used");}
		else{
        	this.nativeStorage.setItem('user',user).then(()=> {this.userService.setUser(user);this.loading.dismiss();this.navCtrl.setRoot(HomePage);}).catch((error)=>{this.loading.dismiss();alert(error);})}});
        
}
}