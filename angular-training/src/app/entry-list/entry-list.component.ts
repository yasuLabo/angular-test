import { Component,Input, Output ,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Entry } from '../entry.model';

@Component({
  selector: 'app-entry-list',
  imports: [CommonModule],
  templateUrl: './entry-list.component.html',
  styleUrl: './entry-list.component.css'
})
export class EntryListComponent {
  @Input() entries: Entry[] = [];
  @Output() entryDelete = new EventEmitter<Entry>();

  onDelete(entry: Entry) {
    this.entryDelete.emit(entry);
  }
}
