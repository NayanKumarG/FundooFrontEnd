import { Component, OnInit } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User} from 'src/app/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user:User=new User();
  constructor(private userService:UserService,private router:Router,private matSnackBar:MatSnackBar) { }

  ngOnInit(){
  }

  name=new FormControl(null,[Validators.required , Validators.pattern('[a-zA-Z]*')]);
  email = new FormControl(null,[Validators.required,Validators.email]);
  password= new FormControl(null,[Validators.required,Validators.minLength(8)]);
  phoneNumber=new FormControl(null,[Validators.required,Validators.pattern('^[1-9]{1}[0-9]{9}$')]);

  getNameErrorMessage(){
    return this.name.hasError('required')? "Enter name":
    this.name.hasError('pattern')?"Enter Characters":
     "";
   }

   getEmailErrorMessage(){
    return this.email.hasError('required')? "Enter Email Id":
    this.email.hasError('email')? "EmailId not valid":
     "";
   }

   getPasswordErrorMessage(){
    return this.password.hasError('required')? "Enter Password":
    this.password.hasError('minLength')? "minimum 8 characters required":
     "";
   }

   getPhoneNoErrorMessage(){
    return this.phoneNumber.hasError('required')? "Enter PhoneNo":
    this.phoneNumber.hasError('pattern')? "PhoneNo not valid":
     "";
   }
   onSubmit(){
     this.user.name = this.name.value;
     this.user.email = this.email.value;
     this.user.password = this.password.value;
     this.user.phoneNumber = this.phoneNumber.value;
     this.userService.registerUser(this.user).subscribe(
      (response:any) =>{
        this.matSnackBar.open(response.message, "succesfull", {duration:5000})
     },
     (error:any)=> {
       this.matSnackBar.open(error.error.message, "failed", {duration:5000})
     }
     );
   }


}
