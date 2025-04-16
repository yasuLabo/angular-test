import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { CalendarComponent } from './calendar/calendar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,EntryFormComponent,EntryListComponent,CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  entries: {
    date: string;
    subject: string;
    minutes: number;
  }[] = [
    { date: '2025-03-15', subject: '英語', minutes: 45 },
    { date: '2025-03-16', subject: '数学', minutes: 90 },
  ];

  onEntryAdded(entry: { date: string; subject: string; minutes: number }) {
    this.entries.push(entry);
  }
}
  



