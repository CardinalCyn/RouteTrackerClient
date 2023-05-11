//create route form, outputs the data to main.ts to be submitted to server
import { Component,Output,EventEmitter } from '@angular/core';
@Component({
  selector: 'app-create-route',
  templateUrl: './create-route.component.html',
  styleUrls: ['./create-route.component.css']
})
export class CreateRouteComponent {
  //inputs to submit to main, set by form
  //routename, hours and mins set in fields, routefrom and routeto from places code in maps
  routeName:string="";
  routeFrom:{fromLocationAddress:string,fromLocationPlaceId:string}={fromLocationAddress:"",fromLocationPlaceId:""};
  routeTo:{toLocationAddress:string,toLocationPlaceId:string}={toLocationAddress:"",toLocationPlaceId:""};
  routeTimeHours:number=0;
  routeTimeMinutes:number=0;
  //boolean to display form
  showForm:boolean=false;
  //setters to pass into map form
  setRouteFrom(userRouteFrom:{fromLocationAddress:string,fromLocationPlaceId:string}) {
    this.routeFrom=userRouteFrom;
  }
  setRouteTo(userRouteTo:{toLocationAddress:string,toLocationPlaceId:string}) {
    this.routeTo=userRouteTo;
  }
  //when form is submtited, sends data to main in this format
  @Output() onFormSubmit=new EventEmitter<{routeName:string,routeTime:{routeTimeHours:number,routeTimeMinutes:number},routeFrom:{fromLocationAddress:string,fromLocationPlaceId:string},routeTo:{toLocationAddress:string,toLocationPlaceId:string},}>();
  onSubmit() {
    this.onFormSubmit.emit({routeName:this.routeName,routeTime:{routeTimeHours:this.routeTimeHours,routeTimeMinutes:this.routeTimeMinutes},routeFrom:this.routeFrom,routeTo:this.routeTo});
  }
  //forms for displaying and hiding form, reset used once form is submitted correctly
  displayForm() {
    this.showForm=true;
  }
  hideForm() {
    this.showForm=false;
  }
  resetForm() {
    this.showForm=false;
    this.routeName="";
    this.routeTimeHours=0;
    this.routeTimeMinutes=0;
    this.routeFrom={fromLocationAddress:"",fromLocationPlaceId:""};
    this.routeTo={toLocationAddress:"",toLocationPlaceId:""};
  }
}
