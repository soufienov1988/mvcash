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
  selector: 'page-payement',
  templateUrl: 'payement.html',
})
export class PayementPage {
annonce:any;
  constructor(public navCtrl: NavController, public ap: AnnonceserviceProvider) {this.annonce=this.ap.getAnnonce();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TitrePage');
  }
save(){
this.ap.setAnnonce(this.annonce);this.navCtrl.pop();
}
}
