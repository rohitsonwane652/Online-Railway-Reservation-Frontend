import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as jwt_decode from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://localhost:8900/auth";

  constructor(private http:HttpClient,private dialog: MatDialog) { }

  openSignInDialog(): void {
    this.dialog.open(LoginComponent, {
      width: '700px'
    });
  }

  //Generate Token from server
  generateToken(credentials:any){
    return this.http.post(`${this.url}/token`,credentials);
  }

  //for login user
  loginUser(token:string)
  {
    sessionStorage.setItem("token", token);
    const decodeToken:any = jwt_decode(token);
    sessionStorage.setItem("userEmail", decodeToken.sub);
    sessionStorage.setItem("userRole",decodeToken.role);
    return true;
  }

  getLoginUser(){
    return sessionStorage.getItem("userEmail");
  }

  getLoginRole(){
    return sessionStorage.getItem("userRole");
  }

  isRoleUser(){
    if(sessionStorage.getItem("userRole") === 'user'){
      return true;
    }else{
      return false;
    }
  }

  isRoleAdmin(){
    if(sessionStorage.getItem("userRole") === 'admin'){
      return true;
    }else{
      return false;
    }
  }

  //Check User is Logged In
  isLoggedIn()
  {
    let token = sessionStorage.getItem("token");

    if(token==undefined || token==='' || token==null){
      return false;
    }
    else{
      return true;
    }
  }

  //User Logout
  logout(){
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("userRole");
    return true;
  }

  getToken(){
    return sessionStorage.getItem("token");
  }
}
