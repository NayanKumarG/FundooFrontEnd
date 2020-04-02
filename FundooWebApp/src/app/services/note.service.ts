import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import {HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {Note} from 'src/app/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private noteApiUrl = environment.noteApiUrl;
  private createNoteUrl = environment.createNoteUrl;

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json'})
    };

  constructor(private httpService:HttpService , private httpClient:HttpClient) { }

createNote(noteDetail:any):Observable<any>
{
  console.log("note:"+noteDetail);
return this.httpService.post(this.noteApiUrl+this.createNoteUrl,noteDetail,{headers:new HttpHeaders({'token':localStorage.token})});
}

}
