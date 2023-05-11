import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //error message depending on input is valid, and if server req was successful
  errorMessage!: string;
  //passed in to navbar
  loggedIn:boolean=false;
  //service used to check if login successful
  constructor(private authService:AuthService,private router:Router) {}
  //run once login-register-form submit is successful, sets login if true and shows err otherwise
  submitLogin(userInfo:{username:string,password:string}) {
    this.authService
    .loginReq(userInfo["username"],userInfo["password"])
    .subscribe(data=>{
      if(data.status==="loginSuccess"){
        this.router.navigate(['/main']);
      }else{
        this.errorMessage=data.message;
      }
    });
  }
  //checks user session on initialization
  ngOnInit() {
    this.checkSession();
  }
  //checks session, if logged in, redirects to main, otherwise stay
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