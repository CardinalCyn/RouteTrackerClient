import { Component,ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RoutesService } from 'src/app/services/routes.service';
import { Router } from '@angular/router';
import { Route } from 'src/app/interface/route';
import { CreateRouteComponent } from 'src/app/components/create-route/create-route.component';
import { SocketService } from 'src/app/services/socket.service';
import { InputValidationService } from 'src/app/services/input-validation.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent {
  //displays username sent from server
  username!:string
  //holds all the user routes associated w/ count, uses interface from interfaces/route
  userRoutes:Route[]=[]
  //marks if user is logged in
  loggedIn:boolean=false;
  //displays error from attempting to submit route
  submitError:string="";
  //displayed if deleting route was unsuccessful
  deleteRouteError:boolean=false;
  //uses auth service to see if logged in, routes service to upload, delete, get routes. router to redirect. socket service to receive emits from server to update all routes
  //input validation service to ensure routes are structured correctly
  constructor (private authService:AuthService,private routesService:RoutesService, private router:Router,private socketService:SocketService,private inputValidationService:InputValidationService) {}

  //on init, checks session, and listens for emit from server to reload routes
  ngOnInit() {
    this.checkSession();
    this.socketService.reloadRoutes().subscribe((data:any)=>{
      if(data.status==="success"){
        this.getRoutes();
      }
    })
  }
  //submits route, data from create-route, checks if its valid or not, then runs create route, otherwise displays err
  submitRoute(routeInfo:{routeName:string,routeTime:{routeTimeHours:number,routeTimeMinutes:number},routeFrom:{fromLocationAddress:string,fromLocationPlaceId:string},routeTo:{toLocationAddress:string,toLocationPlaceId:string}}) {
    const validationResult=this.inputValidationService
    .validateRouteCreation(routeInfo);
    switch(validationResult){
      case "validRoute":
        this.submitError="";
        this.createRoute(routeInfo);
        window.scrollTo(0, 0);
        break;
      default:
        this.submitError=validationResult;
    }
  }
  //checks user is logged, redirects if not, otherwise sets username and loggedin status
  checkSession () {
    this.authService
    .checkSessionReq()
    .subscribe(
      data=>{
        if(data.status!=="signedIn"){
          this.loggedIn=false;
          this.router.navigate(["/"])
        }else{
          this.loggedIn=true;
          this.getRoutes();
          this.username=data.username;
        }
      }
    )
  }
  //pulls routes from server, if success, sets them, otherwise navigates to login
  getRoutes () {
    this.routesService
    .getRoutesRequest()
    .subscribe(
      data=>{
        if(data.status==="sessionFound"){
          this.userRoutes=data.userRoutes;
        }else{
          this.router.navigate(['/login'])
        }
      }
    )
  }
  //used to run reset form on create route component if the upload is success
  @ViewChild(CreateRouteComponent) childComponent!:CreateRouteComponent
  //if valid input, runs request based on create route data.
  createRoute(routeInfo:{routeName:string,routeTime:{routeTimeHours:number,routeTimeMinutes:number},routeFrom:{fromLocationAddress:string,fromLocationPlaceId:string},routeTo:{toLocationAddress:string,toLocationPlaceId:string}}) {
    this.routesService
    .createRouteRequest(routeInfo)
    .subscribe(
      data=>{
        //switch for errors, if it worked, resets form and gets all routes, otherwise displays err/ navigates based on response from server
        switch(data["status"]) {
          case"routePushed":
            this.getRoutes();
            this.childComponent.resetForm();
            break;
          case "sessionNotFound":
            this.router.navigate(['/']);
            break;
          case "createRoutesReqFailed":
            this.submitError="Your route was unable to be created, try again later"
            break;
          case "routeNotPushed":
            this.submitError="Your route was unable to be created, try again later";
            break;
          case "invalidRoute":
            this.submitError="Your route was unable to be created, try again later";
            break;
          default:
            this.submitError=data["status"];
        }
      }
    )
  }
  //based on route clicked on to delete, sends route id of route, and makes req to server. based on response of server, displays error or navigates
  deleteRoute(routeInfo:{routeId:string}) {
    this.routesService
    .deleteRouteRequest(routeInfo)
    .subscribe(
      data=>{
        switch(data["status"]) {
          case"successfulDeletion":
          this.getRoutes();
          this.deleteRouteError=false;
          break;
          case"sessionNotFound":
          this.router.navigate(['/'])
          break;
          case"deleteRouteReqFailed":
          this.deleteRouteError=true;
          break;
          default:
            this.router.navigate(["/"])
        }
      }
    )
  }
}