import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
const HttpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json',
  }),withCredentials:true,
}
@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private apiUrl="https://127.0.0.1:5000/";
  
  constructor(private http:HttpClient) { }
  //pulls array of user routes from server
  getRoutesRequest () {
    return this.http.get<any>(this.apiUrl+'getRoutes',HttpOptions)
  }
  //makes post req to server to create route and set in db
  createRouteRequest(routeInfo:{routeName:string,routeTime:{routeTimeHours:number,routeTimeMinutes:number},routeFrom:{fromLocationAddress:string,fromLocationPlaceId:string},routeTo:{toLocationAddress:string,toLocationPlaceId:string}}) {
    return this.http.post<any>(this.apiUrl+"/createRoute",routeInfo,HttpOptions)
  }
  //deletes user's routes based on its id in server
  deleteRouteRequest(routeInfo:{routeId:string}) {
    return this.http.post<any>(this.apiUrl+"/deleteRoute",routeInfo,HttpOptions)
  }
}
