import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AnnonceserviceProvider } from '../../providers/annonceservice/annonceservice';

/**
 * Generated class for the TitrePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-categorie',
  templateUrl: 'categorie.html',
})
export class CategoriePage {
annonce:any;
v1:any;
v2:any;
v3:any;
v4:any;
  constructor(public navCtrl: NavController, public ap: AnnonceserviceProvider) {this.annonce=this.ap.getAnnonce();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TitrePage');
  }
save(){


this.annonce.categorie=this.getString();
console.log(this.annonce.categorie);
this.ap.setAnnonce(this.annonce);this.navCtrl.pop();
}
getString():string{
let str="";
if(this.v1) str+="Meuble";
if(this.v2) str+=",Immobilier";
if(this.v3) str+=",Electromenager";
if(this.v4) str+=",Autre";
if(str[0]==",") str=str.substr(1,str.length);

return str;}
}
