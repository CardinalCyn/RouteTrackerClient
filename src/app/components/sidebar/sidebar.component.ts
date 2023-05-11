import { Component,Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import {faBars} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  faBars=faBars;

  @Input() loggedIn:boolean=false;

  constructor(private authService:AuthService,private router:Router) {}

  showSidebar:boolean=false;
  toggleSidebarVisibility=()=>{
    this.showSidebar=!this.showSidebar;
  }

  logInDemo() {
    this.authService
    .loginReq("demo","123123")
    .subscribe(data=>{
      if(data.status==="loginSuccess"){
        this.router.navigate(['/main'])
      }else{
        console.log("error signing in with demo")
        console.log(data);
      }
    })
  }

  logOut() {
    this.authService
    .logOutReq()
    .subscribe(data=>{
      if(data.status==="loggedOut"){
        this.router.navigate(["/"]);
      }
    })
  }
}
