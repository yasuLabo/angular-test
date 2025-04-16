import { Component,Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entry-list',
  imports: [CommonModule],
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.css'
})
export class EntryListComponent {
  @Input() entries:{
    date:string;
    subject:string;
    minutes:number;
  }[]=[];
}
