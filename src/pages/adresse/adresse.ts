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
  selector: 'page-adresse',
  templateUrl: 'adresse.html',
})
export class AdressePage {
annonce:any;ville:string;rue:string;numero;
  constructor(public navCtrl: NavController, public ap: AnnonceserviceProvider) {this.annonce=this.ap.getAnnonce();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TitrePage');
  }
save(){
console.log(this.ville);
this.annonce.adresse=this.numero+", "+this.rue+", "+this.ville;
this.ap.setAnnonce(this.annonce);this.navCtrl.pop();
}
}
