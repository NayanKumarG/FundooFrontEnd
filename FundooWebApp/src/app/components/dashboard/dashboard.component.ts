import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material';
import { NoteService } from 'src/app/services/note.service';
import { Label } from 'src/app/models/label.model';
import { LabelService } from 'src/app/services/label.service';
import { EditlabelComponent } from '../editlabel/editlabel.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

title: String;
  value= '';
  imagesrc:any;

  view: boolean = false;
  grid = "row";
  userName:string;
  userEmail:string;



  labels:Label[];
  constructor(private router:Router , private noteService:NoteService ,private userService:UserService ,private labelService: LabelService,private matDialog: MatDialog) { 
    this.labelService.autoRefresh.subscribe(() => {
      this.getAllLabels();
    });
  }

  ngOnInit() {
this.getAllLabels();
// this.getFile();

this.userName = localStorage.getItem('userName');
this.userEmail = localStorage.getItem('email');

  }


onClick()
{
  localStorage.clear();
  this.router.navigate(["/login"]);
}

refresh() {
  console.log("reloading");
window.location.reload();
}

onArchive(){
  this.router.navigate(['dashboard/displaynote'],{queryParams:{note:'archive'}});
  
}

onTrash(){
  this.router.navigate(['dashboard/displaynote'],{queryParams:{note:'trash'}});
}

reminder()
{
  this.router.navigate(['dashboard/displaynote'],{queryParams:{note:'rem'}});
}

searchNote() {
  this.noteService.setSearchNoteData(this.title);
}

getAllLabels(){
  this.labelService.getAllLabels().subscribe(
    (response:any)=>
    {
    this.labels = response['object'];
      }
        );
}

openEditLabelDialog() {
  const dialogRef = this.matDialog.open(EditlabelComponent, 
    {
    width: "300px",
    height: "Auto",
    data:this.labels,
  }
  );
  dialogRef.afterClosed().subscribe(result => {
    console.log("dialog closed");
  });
}

getNotes(label){
  this.router.navigate(['dashboard/displaynote'],{queryParams:{ note: 'label', value: label.labelId }});
}

getView() {
  if(this.view==true){
    this.view=false;
    this.grid="row";
  }
  else{
    this.view=true;
    this.grid="column";
  }
    // this.router.navigate(['/dashboard/displaynote'], { queryParams: { note: 'view', view: this.grid } });
    this.noteService.setView(this.grid);
  console.log(this.view);
}

getFile()
{
  this.userService.getFile().subscribe(
    (response:any)=>{

      this.imagesrc=response['object'];
    }
  )
}
}
