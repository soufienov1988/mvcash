import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Item} from '../../pages/new-item/item';

/*
  Generated class for the ItemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ItemProvider {item:any;
data:ItemData;
  constructor(public http: Http) {this.item=new Item();this.data=new ItemData();
  }
setAttributes(filenames,paths,removes,targets,fullremotePaths,remotePaths){
	this.data.filenames=filenames;
	this.data.paths=paths;
	this.data.removes=removes;
	this.data.targets=targets;
	this.data.fullremotePaths=fullremotePaths;
	this.data.remotePaths=remotePaths;
	
}
getItemData():ItemData{return this.data;}
getAnnonce() {return this.item;}
setAnnonce(dt){this.item=dt;}
////////////////////////////////////////////////////////////////////

	
}
export class ItemData {
 public   paths: string[] ;
 public removes: string[];
 public targets :string[];
 public filenames:string[];

 public fullremotePaths: string[];
public remotePaths: string[];
  constructor(

  ) {  }
}
