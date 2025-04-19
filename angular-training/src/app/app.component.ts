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
  }[] = [];

  onEntryAdded(entry: { date: string; subject: string; minutes: number }) {
    this.entries.push(entry);
  }
}
  



