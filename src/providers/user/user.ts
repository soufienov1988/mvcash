import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {User} from '../../pages/signup/user';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserProvider {
private user:User
  constructor(public http: Http) {
    console.log('Hello UserProvider Provider');
  }
setUser(user:any){this.user=<User> user}
getUser(){return this.user}
getUserId(){return this.user.id}
}
