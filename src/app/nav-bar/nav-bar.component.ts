import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loggedIn = false;
  public isUser = true;
  public token:any;

  constructor(private loginService:LoginService) {}

  openSignInDialog(): void {
    this.loginService.openSignInDialog();
  }

  ngOnInit(): void {
      this.token = this.loginService.getToken();
  }

  isLoggedIn(){
    return this.loginService.isLoggedIn();
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

  logoutUser(){
    this.loginService.logout();
    location.reload();
  }

  logoutAdmin(){
    this.loginService.logout();
  }
}
