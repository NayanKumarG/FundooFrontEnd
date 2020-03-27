import { Component, OnInit } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {ResetPassword} from 'src/app/models/reset-password.model';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPassword:ResetPassword = new ResetPassword();

  constructor(private userService:UserService,private router:Router,private matSnackBar:MatSnackBar) { }

  ngOnInit() {
  }

  email = new FormControl(null,[Validators.required,Validators.email]);
  password= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);
  confirmPassword= new FormControl(null,[Validators.required,Validators.pattern('[a-zA-Z0-9@#$%&]{8,20}')]);

  getEmailErrorMessage(){
    return this.email.hasError('required')? "Enter Email Id":
    this.email.hasError('email')? "EmailId not valid":
     "";
   }

   getPasswordErrorMessage(){
    return this.password.hasError('required')? "Enter Password":
    this.password.hasError('pattern')? "minimum 8 characters required":
     "";
   }

   getConfirmPasswordErrorMessage(){
    return this.confirmPassword.hasError('required')? "Enter Password":
    this.confirmPassword.hasError('pattern')? "minimum 8 characters required":
     "";
   }

   onSubmit()
   {

    this.resetPassword.email = this.email.value;
    this.resetPassword.password = this.password.value;
    this.resetPassword.confirmPassword = this.confirmPassword.value;
    this.userService.userSetPassword(this.resetPassword).subscribe(
      (response:any) =>{
        
         this.matSnackBar.open("Password reset", "success", {duration:5000})
         this.router.navigate(["/login"]);
      },
      error=> {
        this.matSnackBar.open("Check credentials", "failed", {duration:5000})
      }

    );
   }

}
