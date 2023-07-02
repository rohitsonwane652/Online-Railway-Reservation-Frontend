import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials={
    email:'',
    password:''
  }

  redirectUrl:any

  constructor(private loginService:LoginService,private dataService:DataService, private router:Router) {}

  onSubmit(){
    if((this.credentials.email!='' && this.credentials.password!='') && 
        (this.credentials.email!=null && this.credentials.password!=null)){

        this.loginService.generateToken(this.credentials).subscribe(
          (response:any) =>{
            this.loginService.loginUser(response.token);
            this.redirectUrl = this.dataService.getRedirectUrl()
            if(this.redirectUrl === ''){
              this.router.navigate(["/dashboard"])
            }
            this.router.navigate([this.dataService.redirectUrl])
          },
          error=>{
            console.log(error);
          }
        )
    }
    else{
      console.log("Please Enter Values")
    }
  }
}
