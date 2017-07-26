import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import {Http} from '@angular/http';
import { Validators, FormControl, FormGroup} from '@angular/forms'
import {UserProvider} from '../../providers/user/user';
import {Network} from "@ionic-native/network";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
public loading ;signinForm:FormGroup;
 	email:string;
	password:string;

	url:string="https://socialapps.000webhostapp.com/api/social_register";
  constructor(public alertCtrl: AlertController,private network: Network,public navCtrl: NavController,public userService:UserProvider, private facebook: Facebook, public nativeStorage:NativeStorage, public http:Http, private gp: GooglePlus,public loadingCtrl: LoadingController )
  {
  
   this.signinForm=new FormGroup({
		
		email: new FormControl('', Validators.compose([
			Validators.required,
			Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
		])),
		
		password: new FormControl('', Validators.compose([
			Validators.required]))
	});
        
 
    }
	checkInternet():boolean{
	  if(<string>this.network.type=="none"||<string>this.network.type=="unknown")
		  return false;
	  else return true;
  }
  GoogleLogin(){this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  this.gp.login(
    {
      'offline': true, // optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    }).then((obj)=>{this.loading.present(); 
	let current_user={
          name: obj.displayName,
          id: obj.userId,
          email: obj.email,
          picture: obj.imageUrl
        };
		this.saveUser(current_user);
	
  })}
  FacebookLogin(): void {    this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });  let params = new Array<string>();

    this.facebook.login(['email']).then( (response) => { 
	let userId = response.authResponse.userID;
	this.facebook.api("/me?fields=name,email", params).then((user)=>{this.loading.present(); 
	user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
	let current_user={
          name: user.name,
          id: userId,
          email: user.email,
		  password: null,
          picture: user.picture
        };
		 this.saveUser(current_user);
		})
}).catch((error) => { alert("error") });
  }
  
    saveUser(user:any){
this.http.post(this.url, user)
        .subscribe(data => {
        	this.nativeStorage.setItem('user',user).then(()=> {this.userService.setUser(user);this.navCtrl.setRoot(HomePage);this.loading.dismiss(); 
}).catch((error)=>{alert(error);this.loading.dismiss(); 
})});

        }

  NormalLogin(){if (this.checkInternet())
	  { if(this.signinForm.valid){
  let current_user={
          email: this.email,
          password: this.password
        };
	  this.signIn(current_user);}}
 else alert("verifiez la connexion internet");
 }
signUp(){this.navCtrl.push(SignupPage);}
signIn(user:any){
	this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
this.loading.present();
this.http.post("https://socialapps.000webhostapp.com/api/login", user)
        .subscribe(data => {console.warn(data["_body"]);
		try{let obj=JSON.parse(data["_body"]);
		let current_user={
			password:user.password,
          name: obj.data.name,
          id: obj.data.id,
          email: obj.data.email,
          picture: "nope",
        };
        	this.nativeStorage.setItem('user',current_user).then(()=> {this.userService.setUser(current_user);this.navCtrl.setRoot(HomePage);this.loading.dismiss();}).catch((error)=>{this.loading.dismiss();alert(error);})}
			
			catch(error) {this.loading.dismiss();alert("wrong email or password");}
			});

}
newpassword(email){
	this.loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
this.loading.present();
this.http.get("https://socialapps.000webhostapp.com/api/new_password/"+email)
.map(res => res.json()).subscribe(data=>{if(data=="200") alert("success, verfiez votre boite e-mail pour récupérer le nouveau mot de passe"); else alert(email+": ce e-mail n'existe pas ");this.loading.dismiss();},error=>{alert("error");this.loading.dismiss();});
}
passswd(){
	 let alert1 = this.alertCtrl.create({
    title: 'Mot de passe oublié',
    message: 'Le nouveau mot de passe sera envoyé à '+this.email,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: "d'accord",
        handler: () => {
         this.newpassword(this.email);
        }
      }
    ]
  });
  
  
	let alert2 = this.alertCtrl.create({
    title: 'Mot de passe oublié',
    message: 'inséerez votre e-mail pour recevoir le nouveau mot de passe',
	inputs:[
	{label:'email',type:'text',name:"email"}],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: "d'accord",
        handler: data => {
          this.newpassword(data.email);
        }
      }
    ]
  });
  if(this.email)
  alert1.present();
else
  alert2.present();
}
}
