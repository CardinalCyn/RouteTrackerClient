import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputValidationService {

  constructor() { }
//checks username/pass are alphanumerical and valid len
  validateSignIn(username:string,password:string) {
    const minUsernameLength=2;
    const maxUsernameLength=20;
    const minPasswordLength=6;
    const maxPasswordLength=30;
    const regExp=/^[a-zA-z0-9]+$/;

    if(username.length<minUsernameLength||username.length>maxUsernameLength){
      return "Usernames must be between 2 and 20 characters";
    }
    if(!regExp.test(username)){
      return "Usernames must use alphanumerical characters"
    }
    if(password.length<minPasswordLength||password.length>maxPasswordLength){
      return "Passwords must be between 6 and 30 characters";
    }
    if(!regExp.test(password)){
      return "Passwords must use alphanumerical characters"
    }
    return "credentialsValid"
  }
//checks if route submission is valid
  validateRouteCreation(routeInfo:{routeName:string,routeTime:{routeTimeHours:number,routeTimeMinutes:number},routeFrom:{fromLocationAddress:string,fromLocationPlaceId:string},routeTo:{toLocationAddress:string,toLocationPlaceId:string}}) {
    const routeName=routeInfo.routeName;
    const routeMinutes=routeInfo.routeTime.routeTimeMinutes;
    const routeHours=routeInfo.routeTime.routeTimeHours;
    const routeFromLocationAddress=routeInfo.routeFrom.fromLocationAddress
    const routeFromLocationPlaceId=routeInfo.routeFrom.fromLocationPlaceId
    const routeToLocationAddress=routeInfo.routeTo.toLocationAddress
    const routeToLocationPlaceId=routeInfo.routeTo.toLocationPlaceId
    
    const regExp=/^[a-zA-z0-9]+$/;
    //route name needs char limit, alphanumerical
    if(routeName.length<1||routeName.length>20||!regExp.test(routeName)){
      return "Route names must be between 1 and 20 characters, and use alphanumerical values";
    }
    //minutes and hours have to actually be minutes and hours
    if(!routeMinutes&&routeMinutes!==0||routeMinutes>=60||routeMinutes<0||!routeHours&&routeHours!==0||routeHours<0||routeHours>=10000){
      return "Route times must be valid values";
    }
    //makes sure that route location/place ids are actual values, and makes sure they arent the same for a rotue
    if(!routeFromLocationAddress||!routeFromLocationPlaceId||!routeToLocationAddress||!routeToLocationPlaceId||routeFromLocationAddress===routeToLocationAddress){
      return "You must select two valid places for directions";
    }
    return "validRoute";
  }
}
