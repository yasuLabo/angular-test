import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EntryFormComponent } from './entry-form/entry-form.component';
import { EntryListComponent } from './entry-list/entry-list.component';
import { CalendarComponent } from './calendar/calendar.component';
import { Entry } from './entry.model';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from './supabase.service';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    EntryFormComponent,
    EntryListComponent,
    CalendarComponent,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  selectedYear = new Date().getFullYear();
  selectedMonth = new Date().getMonth();
  displayModel: 'all' | 'selectedMonth' | 'currentMonth' = 'all';

  genres: string[] = [];
  entries: Entry[] = [];

  // get filteredEntries(): Entry[] {
  //   return this.entries.filter((entry) => {
  //     const entryDate = new Date(entry.date);

  //     if (this.displayModel === 'selectedMonth') {
  //       return (
  //         entryDate.getFullYear() === this.selectedYear &&
  //         entryDate.getMonth() === this.selectedMonth
  //       );
  //     }
  //     if (this.displayModel === 'currentMonth') {
  //       return (
  //         entryDate.getFullYear() === new Date().getFullYear() &&
  //         entryDate.getMonth() === new Date().getMonth()
  //       );
  //     }
  //     return true;
  //   });
  // }

  constructor(private supabaseService: SupabaseService) {}

  get filteredEntries(): Entry[] {
    return this.entries.filter((entry) => {
      const entryMonth = entry.date.substring(0, 7); // "YYYY-MM"

      if (this.displayModel === 'selectedMonth') {
        const selectedMonth = `${this.selectedYear}-${(this.selectedMonth + 1)
          .toString()
          .padStart(2, '0')}`;
        return entryMonth === selectedMonth;
      }

      if (this.displayModel === 'currentMonth') {
        const now = new Date();
        const currentMonth = `${now.getFullYear()}-${(now.getMonth() + 1)
          .toString()
          .padStart(2, '0')}`;
        return entryMonth === currentMonth;
      }

      return true; // 全期間モード
    });
  }

  onEntryAdded(entry: { date: string; subject: string; minutes: number }) {
    this.entries.push(entry);
    this.supabaseService.addEntry(entry);
  }

  onCalendarChange({ year, month }: { year: number; month: number }) {
    this.selectedYear = year;
    this.selectedMonth = month;
  }

  ngOnInit() {
    this.supabaseService.getSubject().then((data) => {
      this.genres = data;
    });

    this.supabaseService.getEntries().then((data) => {
      this.entries = data;
    });
  }
}
