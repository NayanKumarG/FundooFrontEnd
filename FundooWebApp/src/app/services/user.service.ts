import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {User} from 'src/app/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userApiUrl = environment.userApiURL;

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json'})
    };

  constructor(private httpService:HttpService) { }

  registerUser(user:User):Observable<any>
  {
    return this.httpService.post(this.userApiUrl+environment.registerURL,user,this.httpOptions);
  }
}
