import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
//required httpheaders for cors and cookie setting/ server checking cookies
const HttpOptions={
  headers:new HttpHeaders({
    'Content-Type':'application/json',
  }),withCredentials:true,
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl="https://127.0.0.1:5000/";
  
  constructor(private http:HttpClient) { }
  //request to login
  loginReq(username:string,password:string) {
    return this.http.post<any>(this.apiUrl+"login",{username,password},HttpOptions);
  }
  //request for registering
  registerReq(username:string,password:string) {
    return this.http.post<any>(this.apiUrl+"register",{username,password},HttpOptions);
  }
  //request to check session
  checkSessionReq() {
    return this.http.get<any>(this.apiUrl+"checkSession",HttpOptions);
  }
  //request for logging out
  logOutReq() {
    return this.http.get<any>(this.apiUrl+"logout",HttpOptions);
  }
}