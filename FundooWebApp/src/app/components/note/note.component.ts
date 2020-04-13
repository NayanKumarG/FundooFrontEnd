import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar , MatDialog, MatDialogRef} from '@angular/material';
import { UpdatenoteComponent } from '../updatenote/updatenote.component';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;


 
  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar,private dialog: MatDialog) { }

  ngOnInit() {
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

}
