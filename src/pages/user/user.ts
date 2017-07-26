import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { LoginPage } from '../login/login';
import { NativeStorage } from '@ionic-native/native-storage';



export class UserPage {

  user: any;
  userReady: boolean = false;

  constructor(public navCtrl: NavController, private ns:NativeStorage) {}

  ionViewCanEnter(){
    let env = this;
    this.ns.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
        env.userReady = true;
    }, function(error){
      console.log(error);
    });
  }

 
}
