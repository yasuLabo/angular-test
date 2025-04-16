import { Component,EventEmitter,Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import{FormsModule} from '@angular/forms';


@Component({
  selector: 'app-entry-form',
  imports: [CommonModule,FormsModule],
  templateUrl: './entry-form.component.html',
  styleUrl: './entry-form.component.css'
})
export class EntryFormComponent {
  date :string=new Date().toISOString().substring(0,10);
  subject:string='英語';
  minutes:number=30;

  @Output() entryAdd=new EventEmitter<{
    date:string;
    subject:string;
    minutes:number;
  }>();

  submitForm(){
    this.entryAdd.emit({
      date:this.date,
      subject:this.subject,
      minutes:this.minutes,
    });
    this.minutes=30;
  }

  
}
