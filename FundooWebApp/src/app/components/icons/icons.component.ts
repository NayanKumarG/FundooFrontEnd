import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar,MatDialog } from '@angular/material';
import { AddlabelComponent } from '../addlabel/addlabel.component';
import { ReminderComponent } from '../reminder/reminder.component';
import { CollaboratorComponent } from '../collaborator/collaborator.component';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  @Input() note: Note;

  reminderDate:string;
  datePipeString : string;
  tommorrowDate:string;
  setReminderDate:string;
  

  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar,private matDialog: MatDialog , private datePipe: DatePipe) { 
      this.datePipeString = datePipe.transform(Date.now(),'yyyy-MM-dd');
    console.log("date today:",this.datePipeString);
    }

  colorsList = [
    [
      { 
        colorCode: "rgba(198, 222, 255,1)", name: "Blue" 
      },
      { 
        colorCode: "rgba(229, 228, 226,1)", name: "Gray" 
      },
      { 
        colorCode: "rgba(230, 169, 236,1)", name: "Pink" 
      },
    ],
    [
      { 
        colorCode: "rgba(233, 171, 23,1)", name: "Yellow" 
      },
      { 
        colorCode: "rgba(249, 150, 107,1)", name: "Orange" 
      },
      { 
        colorCode: "rgba(255,255,255,1)", name: "white" 
      },
    ]
  ]

  ngOnInit() {
  }

  archieveNote()
{
this.noteService.archieveNote(this.note.noteId).subscribe(
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

changeColor(color){
  console.log(color.name);
  this.noteService.addColor(this.note.noteId , color.name).subscribe(
    response => {
      console.log("response : ", response);
      this.matSnackBar.open(response['message'], "ok", {
        duration: 4000
      });
    }
  );
}

openLabel(note): void {
  const dialogRef = this.matDialog.open(AddlabelComponent, {
    width: '250px', height: 'auto', data: { note }
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log('matdialog closed');
  });
}

datePicker(note) {
const dialogRef = this.matDialog.open(ReminderComponent, {
  data : {noteId:note.noteId},
  panelClass: 'custom-dialog-container'
});
dialogRef.afterClosed().subscribe(result => {
  console.log("collaborator closed");
});

}



addCollaborator(note){
  const dialogRef=this.matDialog.open(CollaboratorComponent,{
    data:{noteId:note.noteId}
  });
  dialogRef.afterClosed().subscribe(result => {
    console.log("collaborator closed");
  });
}

today(note)
{
  let time:string="9:00";
this.reminderDate = this.datePipeString+","+time+":00";
let newDate = new Date(this.reminderDate);
console.log("Formated date:",newDate);
let reminder={
  reminder:newDate
}
this.noteService.addReminder(note.noteId , reminder).subscribe(
  response => {
    console.log("response : ", response);
    this.matSnackBar.open(response['message'], "ok", { duration: 4000 });
  }
);

}

tommorrow(note)
{
  let time:string="9:00";
  const cal = new Date();
  cal.setDate(cal.getDate() + 1);
  this.reminderDate =cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
  this.tommorrowDate = this.datePipe.transform(this.reminderDate,'yyyy-MM-dd');
  console.log("tommorrow date:",this.tommorrowDate);
  this.setReminderDate = this.tommorrowDate+","+time+":00";


  // this.reminderDate = cal.getFullYear() + ':' + cal.getMonth() + ':' + cal.getDate();
  console.log("set date:",this.setReminderDate);
  let newDate = new Date(this.setReminderDate);
console.log("Formated date:",newDate);
let reminder={
  reminder:newDate
}
this.noteService.addReminder(note.noteId , reminder).subscribe(
  response => {
    console.log("response : ", response);
    this.matSnackBar.open(response['message'], "ok", { duration: 4000 });
  }
);
}

nextWeek(note)
{
//   let time:string="9:00";
//   const cal = new Date();
//   cal.setDate(cal.getDate() + (1 + 7 - cal.getDay()) % 7);  
  
//   this.reminderDate = cal.getMonth() + 1 + '/' + cal.getDate() + '/' + cal.getFullYear();
//   console.log("next week monday:",this.reminderDate);

//   this.setReminderDate = this.reminderDate+","+time+":00";
//   console.log("set date:",this.setReminderDate);
//   let newDate = new Date(this.setReminderDate);
// console.log("Formated date:",newDate);
// let reminder={
//   reminder:newDate
// }
// this.noteService.addReminder(note.noteId , reminder).subscribe(
//   response => {
//     console.log("response : ", response);
//     this.matSnackBar.open(response['message'], "ok", { duration: 4000 });
//   }
// );
}


}
