import { Component, ElementRef, ViewChild,Output,EventEmitter } from '@angular/core';
import {GoogleMap} from '@angular/google-maps'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  
  constructor() {}
  //sets initial coordinates of google map to be set on
  initialCoordinates={
    lat:38.2756354,
    lng:-104.65636
  }
  mapConfigurations={
    //disables big part of ui
    disableDefaultUI:false,
    //allows user to fullscreen
    fullscreencontrol:true,
    //allows user to zoom in and out
    zoomControl:true,
  }
  //references fields in html, allows putting in labels and inputs in map instead of outside, and use places api with search
  @ViewChild('fromMapSearchLabel') fromSearchLabel!: ElementRef;
  @ViewChild('toMapSearchLabel') toSearchLabel!: ElementRef;
  @ViewChild('fromMapSearchField') fromSearchField!: ElementRef;
  @ViewChild('toMapSearchField') toSearchField!: ElementRef;

  @ViewChild('GoogleMap') map!:GoogleMap;

  @Output() setRouteFrom=new EventEmitter<{fromLocationAddress:string,fromLocationPlaceId:string}>();
  @Output() setRouteTo=new EventEmitter<{toLocationAddress:string,toLocationPlaceId:string}>();

  ngAfterViewInit(): void {
    //creates maps search box that references from and to searchfields
    const fromSearchBox=new google.maps.places.SearchBox(
      this.fromSearchField.nativeElement,
    );
    const toSearchBox=new google.maps.places.SearchBox(
      this.toSearchField.nativeElement,
    );
    //pushes the labels and input fields parents to top of google map
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(
      this.fromSearchField.nativeElement.parentNode,
    );
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(
      this.toSearchField.nativeElement.parentNode,
    );
    //creates listener to fromsearchbox, when you type, list of places pops up under the field
    fromSearchBox.addListener('places_changed',()=>{
      const places=fromSearchBox.getPlaces();
      if(places===undefined||places.length===0){
        return;
      }
      //used to set viewport around the place that you select
      const bounds=new google.maps.LatLngBounds();
      //iterates through the place you select, if its valid, will emit the locationaddress and placeid to create route form
      places.forEach(place=>{
        if(!place.geometry||!place.geometry.location){
          return;
        }
        if(place.formatted_address&&place.place_id){
          this.setRouteFrom.emit({fromLocationAddress:place.formatted_address,fromLocationPlaceId:place.place_id})
        }
        if(place.geometry.viewport){
          bounds.union(place.geometry.viewport);
        }else{
          bounds.extend(place.geometry.location);
        }   
      });
      this.map.fitBounds(bounds);
    })
    toSearchBox.addListener('places_changed',()=>{
      const places=toSearchBox.getPlaces();
      if(places===undefined||places.length===0){
        return;
      }
      const bounds=new google.maps.LatLngBounds();
      places.forEach(place=>{
        if(!place.geometry||!place.geometry.location){
          return;
        };
        if(place.formatted_address&&place.place_id){
          this.setRouteTo.emit({toLocationAddress:place.formatted_address,toLocationPlaceId:place.place_id});
        }
        if(place.geometry.viewport){
          bounds.union(place.geometry.viewport);
        }else{
          bounds.extend(place.geometry.location);
        }
      });
      this.map.fitBounds(bounds);
    })
  }
}
