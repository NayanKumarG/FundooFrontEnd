import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import {HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable,Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabelService {


  private labelUrl = environment.labelApiUrl;
  private createLabelUrl = environment.createLabelUrl;
private deleteLabelUrl = environment.deleteLabelUrl;
private updateLabelUrl = environment.updateLabelUrl;

  constructor(private httpService:HttpService , private httpClient:HttpClient) { }

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json' ,token: localStorage.getItem("token")})
    };

  private subject = new Subject<any>();
  public get autoRefresh() {
    return this.subject;
  }

  createLabel(label:any){
    return this.httpService.post(this.labelUrl+this.createLabelUrl,label,this.httpOptions);
    this.subject.next();
  }

  deleteLabel(labelId:any){
return this.httpService.delete(`${this.labelUrl}${this.deleteLabelUrl}?labelId=${labelId}` , this.httpOptions);
  }

  updateLabel(labelId:any){
    return this.httpService.put(`${this.labelUrl}${this.updateLabelUrl}?labelId=${labelId}`, "" , this.httpOptions);
  }
}
