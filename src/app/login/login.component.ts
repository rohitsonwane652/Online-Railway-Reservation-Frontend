import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(private loginService:LoginService,private dataService:DataService, 
    private router:Router,private dialogRef: MatDialogRef<LoginComponent>) {}

  closeSignInPopUp(){
    this.dialogRef.close();
  }

  errorMessage: string;
  hasError: boolean = false;

  onSubmit(){
    if((this.credentials.email!='' && this.credentials.password!='') && 
        (this.credentials.email!=null && this.credentials.password!=null)){

          this.loginService.generateToken(this.credentials).subscribe(
            (response:any) =>{
              this.dialogRef.close();
              this.loginService.loginUser(response.token);
              this.redirectUrl = this.dataService.getRedirectUrl()
              this.router.navigate([this.dataService.redirectUrl])
            },
            error=>{
              this.errorMessage = "Invalid Credentials";
              this.hasError = true;
            }
          )
    }
    else{
      this.errorMessage = "All fields are required";
      this.hasError = true;
    }
  }
}
