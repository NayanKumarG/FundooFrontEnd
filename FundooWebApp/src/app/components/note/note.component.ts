import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { Label } from 'src/app/models/label.model';
import { NoteService } from 'src/app/services/note.service';
import { LabelService } from 'src/app/services/label.service';
import { MatSnackBar , MatDialog, MatDialogRef} from '@angular/material';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;
  labels:Label[];
  collaborators:User[];
  datePipeString : string;
  displayReminder :string;

 
  constructor(private noteService:NoteService, private labelService:LabelService,private userService:UserService,
    private matSnackBar: MatSnackBar,private dialog: MatDialog , private datePipe: DatePipe) {
      this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd');
     }

  ngOnInit() {
    this.labels = this.note.labels;
    console.log('labels:',this.labels);
    this.getCollaborators();
    console.log("type of reminder:",typeof this.note.reminder);
    this.slice();

  }

  slice()
  {
    var rem = this.note.reminder;
    var today = this.datePipeString;
    if(rem!=null){
var res = rem.slice(0,-9);
    }
    else{
      res = null;
    }
console.log("result:",res);
console.log("this only:",today);

const cal = new Date();
cal.setDate(cal.getDate() + 1);
var reminderDate =cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
var tommorrowDate = this.datePipe.transform(reminderDate,'yyyy-MM-dd');

if(today==res)
{
  this.displayReminder = "Today,8:00PM"

}

else if(tommorrowDate==res){
this.displayReminder = "Tommorrow,8:00AM"
}

else{
  this.displayReminder = rem;
}

  }

  open(note) {
    console.log("note updating", note);
    const matDialogueReference = this.dialog.open(UpdatenoteComponent, {
      width: "auto",
      height: "auto",
      data: { note }
    });
    matDialogueReference.afterClosed().subscribe(result => {
      console.log("note updated");
    });
  }


  pinNote()
  {
this.noteService.pinNote(this.note.noteId).subscribe(
  (response :any) => {
    console.log("response : ", response);
    this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
  }
);
  
}

deleteNote(){
  this.noteService.trashNote(this.note.noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
    );
}

deletePermanently(){
  this.noteService.deleteNotePermanently(this.note.noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
  );
}

remove(label:any){
  this.labelService.removeLabel(label.labelId , this.note.noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
  );
}

removeReminder(noteId:any){
  this.noteService.deleteReminder(noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
  )
}

getCollaborators()
{
 this.userService.getCollaborators(this.note.noteId).subscribe(
  (response:any)=>{
    // this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
    this.collaborators = response['object'];
    console.log("collaborators list:",this.collaborators);
  },
  (error:any)=> {
      this.matSnackBar.open(error.error.message, "failed", {duration:5000});
    }
 ) 
}
}
