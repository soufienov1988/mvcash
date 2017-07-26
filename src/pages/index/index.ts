import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,MenuController} from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { NativeStorage } from '@ionic-native/native-storage';
import {UserProvider} from '../../providers/user/user';
/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})

export class IndexPage {
gotopage;
  constructor(public navCtrl: NavController,public menu:MenuController, public navParams: NavParams,public nativeStorage:NativeStorage,public userService:UserProvider) {
	  this.nativeStorage.getItem('user')
      .then(  (data)=> {
        // user is previously logged and we have his data
        // we will let him access the app
        this.userService.setUser(data);this.gotopage=HomePage;
      }).catch( (error)=> {
		  this.gotopage=LoginPage;
        //we don't have the user data so we will ask him to log in
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }
start(){ 
	this.navCtrl.setRoot(this.gotopage);
}

ionViewDidEnter() {
    this.menu.swipeEnable(false, 'menu1');
  }

}
