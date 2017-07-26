import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import {LoginPage} from '../login/login';
import { NativeStorage } from '@ionic-native/native-storage';

/**
 * Generated class for the IntroPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(public navCtrl: NavController, public nativeStorage:NativeStorage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }
  
 goToHome(){
	this.nativeStorage.setItem('first_use',false);
    this.navCtrl.setRoot(LoginPage);
  }
  
}
