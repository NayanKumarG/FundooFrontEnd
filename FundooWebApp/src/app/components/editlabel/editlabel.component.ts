import { Component, OnInit } from '@angular/core';
import { Label } from 'src/app/models/label.model';
import { LabelService } from 'src/app/services/label.service';
import { MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.scss']
})
export class EditlabelComponent implements OnInit {

  label: Label = new Label();

  constructor(private labelService:LabelService,
    private matSnackBar: MatSnackBar) { }

  ngOnInit() {
  }

  createLabel(){
    this.labelService.createLabel(this.label).subscribe(
      (response:any)=>{
        this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
      },
      (error:any)=> {
          this.matSnackBar.open(error.error.message, "failed", {duration:5000});
        }
    );
  }

  deleteLabel(){
    this.labelService.deleteLabel(this.label).subscribe(
      (response:any)=>{
        this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
      },
      (error:any)=> {
          this.matSnackBar.open(error.error.message, "failed", {duration:5000});
        }
    );
  }

  updateLabel(){
    this.labelService.updateLabel(this.label).subscribe(
      (response:any)=>{
        this.matSnackBar.open(response['message'] , "ok" , {duration:4000});
      },
      (error:any)=> {
          this.matSnackBar.open(error.error.message, "failed", {duration:5000});
        }
    );
  }
}
