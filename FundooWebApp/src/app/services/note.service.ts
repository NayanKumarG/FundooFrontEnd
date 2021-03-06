import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpService} from './http.service';
import {HttpHeaders , HttpClient } from '@angular/common/http';
import { Observable,Subject, BehaviorSubject} from 'rxjs';
import {Note} from 'src/app/models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private _refreshNeeded$= new Subject<void>();
  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  private noteApiUrl = environment.noteApiUrl;
  private createNoteUrl = environment.createNoteUrl;
  private getNotesUrl = environment.getAllNotesUrl;
  private pinNoteUrl = environment.pinNoteUrl;
  private archieveNoteUrl = environment.archieveUrl;
  private trashNoteUrl = environment.trashUrl;
  private addColorUrl = environment.addColorUrl;
  private getArchieveNoteUrl = environment.getArchieveUrl;
  private getTrashedNoteUrl = environment.getTrashedUrl;
  private getPinnedNoteUrl = environment.getPinnedNoteUrl;
  private deleteNotePermanentlyUrl = environment.deletePermanentlyUrl;
  private updatenoteUrl = environment.updateNoteUrl;
 

  private httpOptions={
    headers: new HttpHeaders ({'content-type':'application/json' ,token: localStorage.getItem("token")})
    };

    private searchNote=new Subject<any>();

  constructor(private httpService:HttpService , private httpClient:HttpClient) { }

  private subject = new Subject<any>();
  public get autoRefresh() {
    return this.subject;
  }

  private view=new Subject<any>();

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

getArchieveNotes()
{
  return this.httpService.get(this.noteApiUrl+this.getArchieveNoteUrl,this.httpOptions);
}


getTrashedNotes():Observable<any>
{
  return this.httpService.get(this.noteApiUrl+this.getTrashedNoteUrl,this.httpOptions);
}

getPinnedNotes()
{
  return this.httpService.get(this.noteApiUrl+this.getPinnedNoteUrl , this.httpOptions);
}

deleteNotePermanently(noteId:number){
return this.httpService.delete(this.noteApiUrl+this.deleteNotePermanentlyUrl+noteId,this.httpOptions);
}

setSearchNoteData(message:any){
  return this.searchNote.next({notes:message});
}

getSearchNotes():Observable<any>
{
  return this.searchNote.asObservable();
}

updateNote(userId:number , note:any){
  return this.httpService.put(this.noteApiUrl+this.updatenoteUrl+userId , note , this.httpOptions );
}

addReminder(noteId:number , reminder:any)
{
  return this.httpService.put(`${this.noteApiUrl}${environment.addReminderUrl}?noteId=${noteId}`,reminder , this.httpOptions);
}

deleteReminder(noteId:number)
{
return this.httpService.put(`${this.noteApiUrl}${environment.removeReminderUrl}?noteId=${noteId}`, " " , this.httpOptions);
}

setView(data:any){
  
 this.view.next({view:data});
 
}

getView():Observable<any>{
 return this.view.asObservable();
}

}
