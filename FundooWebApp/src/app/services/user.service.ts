import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import {HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import {User} from 'src/app/models/user.model';
import {Login} from 'src/app/models/login.model';
import {ForgotPassword} from 'src/app/models/forgot-password.model';
import {ResetPassword} from 'src/app/models/reset-password.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiUrl = environment.userApiUrl;

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json'})
    };

  constructor(private httpService:HttpService) { }

  userRegister(user:User):Observable<any>
  {
    console.log("user mail:"+user.email);
    console.log("user pass:"+user.password);
    return this.httpService.post(this.userApiUrl+environment.registerUrl,user,this.httpOptions);
  }

  userLogin(login:Login):Observable<any>
  {
console.log("user:"+login);
     return this.httpService.post(this.userApiUrl+environment.loginUrl,login,this.httpOptions);
  }

  userForgotPassword(forgotPassword:ForgotPassword):Observable<any>
  {
    return this.httpService.post(this.userApiUrl+environment.forgotPasswordUrl,forgotPassword,this.httpOptions);
  }

  userSetPassword(resetPassword:ResetPassword , token:String)
  {
    return this.httpService.put(this.userApiUrl+environment.resetPasswordUrl+token,resetPassword,this.httpOptions);
  }

  userVerification(token:String)
  {
return this.httpService.put(this.userApiUrl+environment.userVerification+token,"" , this.httpOptions);
  }

  addCollaborator(noteId:number , email:any)
  {
    return this.httpService.post(`${this.userApiUrl}${environment.addCollaboratorUrl}?noteId=${noteId}&email=${email}`, {}, {headers:new HttpHeaders({'token':localStorage.token})});
  }

  deleteCollaborator(noteId:number , email:any)
  {
    return this.httpService.delete(`${this.userApiUrl}${environment.deleteCollaboratorUrl}?noteId=${noteId}&email=${email}`, {headers:new HttpHeaders({'token':localStorage.token})}); 
  }

  getCollaborators(noteId:number)
  {
    return this.httpService.get(`${this.userApiUrl}${environment.getCollaboratorsUrl}?noteId=${noteId}`, {headers:new HttpHeaders({'token':localStorage.token})});
  }

  getFile()
  {
    return this.httpService.get(`${this.userApiUrl}${environment.getFileUrl}`, {headers:new HttpHeaders({'token':localStorage.token})});
  }
}
