import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Annonce} from '../../pages/nouvelle-annonce/annonce';


/*
  Generated class for the AnnonceserviceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AnnonceserviceProvider {
annonce:any;
data:AnnonceData;
  constructor(public http: Http) {this.annonce=new Annonce();this.data=new AnnonceData();
  }
setAttributes(filenames,paths,removes,targets,fullremotePaths,remotePaths){
	this.data.filenames=filenames;
	this.data.paths=paths;
	this.data.removes=removes;
	this.data.targets=targets;
	this.data.fullremotePaths=fullremotePaths;
	this.data.remotePaths=remotePaths;
	
}
getData():AnnonceData{return this.data;}
getAnnonce() {return this.annonce;}
setAnnonce(dt){this.annonce=dt;}
////////////////////////////////////////////////////////////////////

	
}
export class AnnonceData {
 public   paths: string[] ;
 public removes: string[];
 public targets :string[];
 public filenames:string[];

 public fullremotePaths: string[];
public remotePaths: string[];
  constructor(

  ) {  }
}
