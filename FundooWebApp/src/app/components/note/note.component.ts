import { Component, OnInit ,Input} from '@angular/core';
import { Note } from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {
  @Input() note: Note;


  // colorsList = [
  //   [
  //     { 
  //       colorCode: "rgba(198, 222, 255,1)", name: "Blue" 
  //     },
  //     { 
  //       colorCode: "rgba(229, 228, 226,1)", name: "Gray" 
  //     },
  //     { 
  //       colorCode: "rgba(230, 169, 236,1)", name: "Pink" 
  //     },
  //   ],
  //   [
  //     { 
  //       colorCode: "rgba(233, 171, 23,1)", name: "Yellow" 
  //     },
  //     { 
  //       colorCode: "rgba(249, 150, 107,1)", name: "Orange" 
  //     },
  //     { 
  //       colorCode: "rgba(255,255,255,1)", name: "white" 
  //     },
  //   ]
  // ]

  constructor(private noteService:NoteService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit() {
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

// archieveNote()
// {
// this.noteService.archieveNote(this.note.noteId).subscribe(
// (response :any) => {
//   console.log("response : ", response);
//   this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
// }
// );

// }

// deleteNote(){
//   this.noteService.trashNote(this.note.noteId).subscribe(
//     (response :any) => {
//       console.log("response : ", response);
//       this.matSnackBar.open(response['message'], "Ok", { duration: 4000})
//     }
//     );
// }

// changeColor(color){
//   console.log(color.name);
//   this.noteService.addColor(this.note.noteId , color.name).subscribe(
//     response => {
//       console.log("response : ", response);
//       this.matSnackBar.open(response['message'], "ok", {
//         duration: 4000
//       });
//     }
//   );
// }

}
