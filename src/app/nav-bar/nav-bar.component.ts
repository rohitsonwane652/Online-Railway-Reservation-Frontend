import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public loggedIn = false;
  public user:String = "";
  public token:any;

  constructor(private loginService:LoginService) {}

  ngOnInit(): void {
      this.loggedIn  = this.loginService.isLoggedIn();
      this.token = this.loginService.getToken();
      this.user = this.loginService.getLoginUser()
  }

  logoutUser(){
    this.loginService.logout();
    location.reload();
  }
}
