import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { SellerHomePage } from '../seller-home/seller-home';
import {UserProvider} from '../../providers/user/user';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
public name="doi";
user;
  constructor(public navCtrl: NavController, public userService:UserProvider ) {
 this.user= this.userService.getUser();
      this.name=this.user.name;
  }
buy(){alert("oo");}
sell(){
	
	this.navCtrl.push(SellerHomePage);}
}
