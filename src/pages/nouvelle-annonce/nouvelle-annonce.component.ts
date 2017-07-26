import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
   selector: 'nouvelle-annonce-observable',
   templateUrl: './nouvelle-annonce.html',
   styleUrls: ['nouvelle-annonce.component.css']
})
export class ObservableComponent implements OnInit { 
  
   errorMessage: String;
   constructor() { }
   ngOnInit(): void {
   }
   
} 