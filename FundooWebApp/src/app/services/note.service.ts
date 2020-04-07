import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import {HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import {Note} from 'src/app/models/note.model';
import { Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private noteApiUrl = environment.noteApiUrl;
  private createNoteUrl = environment.createNoteUrl;
  private getNotesUrl = environment.getAllNotesUrl;
  private pinNoteUrl = environment.pinNoteUrl;
  private archieveNoteUrl = environment.archieveUrl;
  private trashNoteUrl = environment.trashUrl;
  private addColorUrl = environment.addColorUrl;
 

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json' ,token: localStorage.getItem("token")})
    };

  constructor(private httpService:HttpService , private httpClient:HttpClient) { }

  private subject = new Subject<any>();
  public get autoRefresh() {
    return this.subject;
  }

createNote(noteDetail:any):Observable<any>
{
  console.log("note:",noteDetail);
return this.httpService.post(this.noteApiUrl+this.createNoteUrl,noteDetail,{headers:new HttpHeaders({'token':localStorage.token})});
}

getAllNotes(){

  return this.httpService.get(this.noteApiUrl+this.getNotesUrl,this.httpOptions);
}

pinNote(noteId:number){
  console.log("noteId:"+noteId);
  return this.httpService.put(this.noteApiUrl+this.pinNoteUrl+noteId,"",this.httpOptions);
}

archieveNote(noteId:number){
  return this.httpService.put(this.noteApiUrl+this.archieveNoteUrl+noteId , "" , this.httpOptions);
}

trashNote(noteId:number){
  return this.httpService.put(this.noteApiUrl+this.trashNoteUrl+noteId, "" , this.httpOptions);
}

addColor(noteId:number , color:string){
  // var params = { color: colors };
  // var config = { params: params };
  return this.httpService.put(`${this.noteApiUrl}${this.addColorUrl}?noteId=${noteId}&color=${color}`, "" , this.httpOptions);
}

}
