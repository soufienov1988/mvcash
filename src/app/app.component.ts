import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';
import { SignupPage } from '../pages/signup/signup';
import { PasswordPage } from '../pages/password/password';

import { HomePage } from '../pages/home/home';
import { SellerHomePage } from '../pages/seller-home/seller-home';
import { LoginPage } from '../pages/login/login';
import { IndexPage } from '../pages/index/index';
import { ModalItemPage } from '../pages/items/modalPage';
import { ModalContentPage } from '../pages/seller-home/modalPage';
import { ImagepickPage } from '../pages/imagepick/imagepick';
import { ItemImagePage } from '../pages/itemimage/itemimage';
import { NouvelleAnnoncePage } from '../pages/nouvelle-annonce/nouvelle-annonce';
import { NewItemPage } from '../pages/new-item/new-item';
import { ItemsPage } from '../pages/items/items';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = IndexPage;
normalLogin;
  pages;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public nativeStorage:NativeStorage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = {
      'HomePage':  HomePage ,
     'SellerHomePage': SellerHomePage ,
       'NouvelleAnnoncePage': ImagepickPage 
    };

  }
logOut(){this.nativeStorage.remove('user');this.nav.setRoot(LoginPage);}
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      
     this.normalLogin=true;
      this.nativeStorage.getItem('user')
      .then(  (data)=> {console.log("ps "+data.picture);if(data.picture=="nope")this.normalLogin=false;
        // user is previously logged and we have his data
        // we will let him access the app
        //this.rootPage=HomePage;
        this.splashScreen.hide();
      }).catch( (error)=> {
	  this.nativeStorage.getItem('first_use').then(data=>{}).catch(error=>this.nav.setRoot(IntroPage));
        //we don't have the user data so we will ask him to log in
      });        this.splashScreen.hide();

	  this.statusBar.styleDefault();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(this.pages[page]);
  }
  changePswd(){
	  this.nav.push(PasswordPage);
  }
}
