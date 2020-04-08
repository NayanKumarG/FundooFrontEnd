import { Component, OnInit } from '@angular/core';
import {Note} from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-trashednote',
  templateUrl: './trashednote.component.html',
  styleUrls: ['./trashednote.component.scss']
})
export class TrashednoteComponent implements OnInit {

  trashedNotes: Note[];

  constructor(private noteService:NoteService) { }

  ngOnInit() {

    this.noteService.autoRefresh.subscribe(() => {
      this.getTrashedNotes();
    });
    this.getTrashedNotes();
  }

  getTrashedNotes(){
    this.noteService.getTrashedNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        this.trashedNotes = response['object'];
          
      }
    )
  }

}
