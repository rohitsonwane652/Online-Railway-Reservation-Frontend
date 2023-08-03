import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm:FormGroup;

  constructor(private loginService:LoginService,private dialogRef:MatDialogRef<SignupComponent>,
      private formBuilder: FormBuilder,private router:Router){

    this.signupForm = this.formBuilder.group({
      userName:['',[Validators.required,Validators.pattern("[A-Za-z\\s]+")]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]]
    });
    
  }


  get userName(){
    return this.signupForm.get('userName');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get email() {
    return this.signupForm.get('email');
  }

  closeSignInPopUp(){
    this.dialogRef.close();
  }

  userInfo={
    userName:'',
    email:'',
    password:''
  }

  


  onSubmit(){
    console.log(this.signupForm.value);
    this.loginService.createUser(this.signupForm.value).subscribe(
      response =>{
        console.log(response);
      }
    )
    Swal.fire('Success', 'User added successfully!', 'success');
    this.closeSignInPopUp();
  }


  openSignInDialog(){
    this.closeSignInPopUp();
    this.loginService.openSignInDialog();
  }

}
