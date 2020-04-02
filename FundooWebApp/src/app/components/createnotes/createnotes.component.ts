import { Component, OnInit } from '@angular/core';
import { Validators, FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import {Note} from 'src/app/models/note.model';
import { HttpResponse , HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-createnotes',
  templateUrl: './createnotes.component.html',
  styleUrls: ['./createnotes.component.scss']
})
export class CreatenotesComponent implements OnInit {

  constructor(private noteService:NoteService,private router:Router,private matSnackBar:MatSnackBar) { }

  noteModel:Note = new Note();

  ngOnInit() {
  }

  title=new FormControl('',[Validators.required]);
  description=new FormControl('',[Validators.required]);

  open:boolean = false;

  openNote(){
    this.open = true;
  }

  onSubmit()
  {

    this.noteModel.title = this.title.value;
    this.noteModel.description = this.description.value;
    this.noteService.createNote(this.noteModel).subscribe(

      (response:any)=>{
        this.matSnackBar.open("sucess" ,"success" , {duration:5000})
      },
      (error:any)=>{
        this.matSnackBar.open("failed", "failed", {duration:5000})
      }
    );
  }
}
