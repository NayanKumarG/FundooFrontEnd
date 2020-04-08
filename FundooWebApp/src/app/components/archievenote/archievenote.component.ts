import { Component, OnInit } from '@angular/core';
import {Note} from 'src/app/models/note.model';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-archievenote',
  templateUrl: './archievenote.component.html',
  styleUrls: ['./archievenote.component.scss']
})
export class ArchievenoteComponent implements OnInit {

  archivedNotes: Note[];

  constructor(private noteService:NoteService) { }

  ngOnInit() {

    this.noteService.autoRefresh.subscribe(() => {
      this.getArchivedNotes();
    });
    this.getArchivedNotes();

  }

  getArchivedNotes(){
    this.noteService.getArchieveNotes().subscribe(

      (response: any) => {
        console.log("response", response);
        this.archivedNotes = response['object'];
          
      }
    )
  }

}
