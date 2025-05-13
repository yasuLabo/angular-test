import {
  Component,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Entry } from '../entry.model';

interface GenreTotal {
  name: string;
  minutes: number;
}

@Component({
  selector: 'app-genre-progress',
  imports: [CommonModule, MatProgressBarModule],
  templateUrl: './genre-progress.component.html',
  styleUrl: './genre-progress.component.css',
})
export class GenreProgressComponent implements OnChanges {
  @Input() entries: Entry[] = [];

  genreTotals: GenreTotal[] = [];
  totalMinutes = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['entries']) {
      this.calculateTotals();
    }
  }

  private calculateTotals() {
    const map: Record<string, number> = {};
    this.entries.forEach((e) => {
      map[e.subject] = (map[e.subject] || 0) + e.minutes;
    });
    this.genreTotals = Object.entries(map).map(([name, minutes]) => ({
      name,
      minutes,
    }));
    this.totalMinutes = this.genreTotals.reduce((sum, g) => sum + g.minutes, 0);
  }
}
