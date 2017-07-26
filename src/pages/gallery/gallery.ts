import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the GalleryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {

	private images: Array<string>;	
	private grid: Array<Array<string>>;
  
  constructor(private _navCtrl: NavController, private _navParams: NavParams) {
  	this.images = this._navParams.get('images');
  	this.grid = Array(Math.ceil(this.images.length/2));
	this.ionViewLoaded();
  }
remove(uri,event){
	var i = this.images.indexOf(uri);
if(i != -1) {
	this.images.splice(i, 1);
		this.ionViewLoaded();
}}
  ionViewLoaded() {
  	
  	let rowNum = 0;
for (let i = 0; i < this.images.length; i+=2) {
  		
  		this.grid[rowNum] = Array(2);
  		
  		if (this.images[i]) {
  			this.grid[rowNum][0] = this.images[i]
  		}
  		
  		if (this.images[i+1]) {
  			this.grid[rowNum][1] = this.images[i+1]
  		}
  		
  		rowNum++;
  	}
  	
  }

}