import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import * as jwt_decode from 'jsonwebtoken';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url="http://localhost:8900/auth";

  constructor(private http:HttpClient) { }

  //Generate Token from server
  generateToken(credentials:any){
    return this.http.post(`${this.url}/token`,credentials);
  }

  //for login user
  loginUser(token:string)
  {
    localStorage.setItem("token", token);
    const decodeToken:any = jwt_decode(token);
    localStorage.setItem("userEmail", decodeToken.sub);
    localStorage.setItem("userRole",decodeToken.role);
    return true;
  }

  getLoginUser(){
    return localStorage.getItem("userEmail");
  }

  getLoginRole(){
    return localStorage.getItem("userRole");
  }

  //Check User is Logged In
  isLoggedIn()
  {
    let token = localStorage.getItem("token");

    if(token==undefined || token==='' || token==null){
      return false;
    }
    else{
      return true;
    }
  }

  //User Logout
  logout(){
    localStorage.removeItem("token");
    return true;
  }

  getToken(){
    return localStorage.getItem("token");
  }
}
