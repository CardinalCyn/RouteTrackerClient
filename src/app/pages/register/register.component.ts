import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errorMessage!:string;
  loggedIn:boolean=false;
  constructor (private authService:AuthService,private router:Router) {}
  //submits data when login register form inputs are validated. shows success and redirects if it works, otherwise shows error
  submitRegister (userInfo:{username:string,password:string}) {
    this.authService
    .registerReq(userInfo["username"],userInfo["password"])
    .subscribe(data=>{
      if(data.status!=="registerSuccess"){
        this.errorMessage=data.message;
      }else{
        this.router.navigate(['/main']);
      }
    });
  }
//on initialization, checks if user is logged in
  ngOnInit() {
    this.checkSession();
  }
  //uses auth service to run check session req, based on data will navigate or stay on apge
  checkSession () {
    this.authService
    .checkSessionReq()
    .subscribe(
      data=>{
        if(data.status!=="signedIn"){
          this.loggedIn=false;
        }else{
          this.loggedIn=true;
          this.router.navigate(["/main"])
        }
      }
    )
  }
}