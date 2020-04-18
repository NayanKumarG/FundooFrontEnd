import { Component, OnInit ,Inject} from '@angular/core';
import { MAT_DIALOG_DATA , MatDialog ,MatSnackBar} from '@angular/material';
import { NoteService } from 'src/app/services/note.service';

interface Time {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data : any ,private matSnackBar: MatSnackBar, private noteService:NoteService ,private matDialog: MatDialog) { }

  ngOnInit() {
  }

  reminderTime:string;
  reminderDate:any;

  times: Time[] = [
    {value: '8:00 AM', viewValue: ' Morning 8:00 AM'},
    {value: '1:00 PM', viewValue: 'Afternoon 1:00 PM'},
    {value: '6:00 PM', viewValue: 'Evening 6:00 PM'},
    {value: '8:00 PM', viewValue: 'Night 8:00 PM'}
  ];

  repeatReminder = [ {value: 'Does not repeat'},
  {value: 'Daily'},
  {value: 'Weekly'},
  {value: 'Monthly'},
  {value: 'Yearly'}];


saveReminder(date:any){

  console.log("reminder date:" , date)
  console.log("reminder time:",this.reminderTime);
}
setTime(time:any){
  this.reminderTime = time;
}

dateFormat(){
  
  
}

addReminder(noteId:number)
{
this.noteService.addReminder(noteId , this.reminderDate).subscribe(
  response => {
    console.log("response : ", response);
    this.matSnackBar.open(response['message'], "ok", { duration: 4000
    });
  }
);
}
}
