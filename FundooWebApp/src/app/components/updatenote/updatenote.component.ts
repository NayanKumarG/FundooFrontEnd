import { Component, OnInit ,Inject } from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Label } from 'src/app/models/label.model';
import { LabelService } from 'src/app/services/label.service';

@Component({
  selector: 'app-updatenote',
  templateUrl: './updatenote.component.html',
  styleUrls: ['./updatenote.component.scss']
})
export class UpdatenoteComponent implements OnInit {

  note:Note;

  labels:Label[];

  constructor(private noteService: NoteService,private labelService:LabelService,public matDialogRef: MatDialogRef<UpdatenoteComponent>,
    private matSnackBar: MatSnackBar , @Inject(MAT_DIALOG_DATA) public data: any) {
      this.note=this.data.note;
     }

  ngOnInit() {
    this.labels = this.note.labels;
    console.log('labels:',this.labels);
  }

  onSubmit(){
    this.matDialogRef.close();
    this.noteService.updateNote(this.note.noteId , this.note).subscribe(
      (response: any) => {
        this.matSnackBar.open(response['message'], "ok", {duration: 4000});
      },
      errors => {
        this.matSnackBar.open(errors.error.message, "failed", {duration: 4000 });
      }
    );
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

remove(label:any){
  this.labelService.removeLabel(label.labelId , this.note.noteId).subscribe(
    (response :any) => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
    }
  );
}

}
