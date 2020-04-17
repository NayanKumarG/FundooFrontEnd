import { Component, OnInit } from '@angular/core';
import { Validators, FormControl , FormGroup} from '@angular/forms';
import { MatSnackBar , MatDialog  } from '@angular/material';
import { Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import {Note} from 'src/app/models/note.model';
import { HttpResponse , HttpHeaders } from '@angular/common/http';
import { ReminderComponent } from '../reminder/reminder.component';

@Component({
  selector: 'app-createnotes',
  templateUrl: './createnotes.component.html',
  styleUrls: ['./createnotes.component.scss']
})
export class CreatenotesComponent implements OnInit {

  constructor(private noteService:NoteService,private router:Router,private matSnackBar:MatSnackBar , private matDialog: MatDialog) { }

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
if(this.title.value&&this.description.value!=null)
{
    this.noteModel.title = this.title.value;
    this.noteModel.description = this.description.value;
    this.noteService.createNote(this.noteModel).subscribe(

      (response:any)=>{
        console.log("message:"+response.message);
        this.matSnackBar.open("note created" ,"success" , {duration:5000})
      },
      (error:any)=>{
        this.matSnackBar.open("Notes not created", "failed", {duration:3000})
      }
    );
  }

else{
  this.matSnackBar.open("Notes not created", "failed", {duration:5000})
}
  }

  datePicker() {
    this.matDialog.open(ReminderComponent, {
      data : " ",
      panelClass: 'custom-dialog-container'
    });
    
    }
}
