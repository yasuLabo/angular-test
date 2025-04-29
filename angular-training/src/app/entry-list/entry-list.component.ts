import { Component,Input, Output ,EventEmitter, output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entry } from '../entry.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-entry-list',
  imports: [CommonModule,FormsModule],
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.css'
})
export class EntryListComponent {
  @Input() entries: Entry[] = [];
  @Output() entryDelete = new EventEmitter<Entry>();
  @Output() entryUpdate = new EventEmitter<{original:Entry;updated:Entry}>();
  @Input()genres: string[] = [];

  editingEntry:Entry|null = null;
  editDate:string = '';
  editSubject:string = '';
  editMinutes:number = 0;

  //編集開始
  startEdit(entry: Entry) {
    console.log('▶ startEdit called for', entry);
    this.editingEntry = entry;
    this.editDate = entry.date;
    this.editSubject = entry.subject;
    this.editMinutes = entry.minutes;
  }


  //保存
  saveEdit(){
    if(!this.editingEntry) return;
    const original=this.editingEntry;
    const updated:Entry={
      date:this.editDate,
      subject:this.editSubject,
      minutes:this.editMinutes
    };
    this.entryUpdate.emit({original,updated});
    this.editingEntry = null;
  }

  cancelEdit(){
    this.editingEntry = null;
  }



  onDelete(entry: Entry) {
    this.entryDelete.emit(entry);
  }
}
