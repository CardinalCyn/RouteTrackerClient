import { Component,HostListener } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { faLock,faRoute,faClock,faBell,faMap,faSave } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService:AuthService) {}
  loggedIn:boolean=false;

  faLock= faLock;
  faRoute=faRoute;
  faClock=faClock;
  faBell=faBell;
  faMap=faMap;
  faSave=faSave;
  //checks if user is logged in at start, and gets window width
  public getScreenWidth: any;
  ngOnInit() {
    this.checkSession();
    this.getScreenWidth = window.innerWidth;
  }
  //sets data to navbar if user is logged in or not
  checkSession () {
    this.authService
    .checkSessionReq()
    .subscribe(
      data=>{
        if(data.status!=="signedIn"){
          this.loggedIn=false;
        }else{
          this.loggedIn=true;
        }
      }
    )
  }

    @HostListener('window:resize', ['$event'])
    onWindowResize() {
    this.getScreenWidth = window.innerWidth;
  }
}