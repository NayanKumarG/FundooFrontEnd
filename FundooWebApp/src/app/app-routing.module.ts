import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserVerificationComponent } from './components/user-verification/user-verification.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {path:"registration" , component:RegistrationComponent},
  {path:"" , component:LoginComponent},
  {path:"login" , component:LoginComponent},
  {path:"forgotPassword" , component:ForgotPasswordComponent},
  {path:"resetPassword/:token" , component:ResetPasswordComponent},
  {path:"userVerification/:token" , component:UserVerificationComponent},
  {path:"dashBoard" , component:DashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
