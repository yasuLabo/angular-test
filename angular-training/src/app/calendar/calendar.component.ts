import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type CalendarEntry = {
  date: string;
  minutes: number;
};

@Component({
  selector: 'app-calendar',
  imports: [CommonModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  @Input() entries: CalendarEntry[] = [];

  ngOnInit() {
    console.log('test');
  }

  selectedYear: number = new Date().getFullYear();
  selectedMonth: number = new Date().getMonth();
  monthOptions = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ];

  weekDays = ['日', '月', '火', '水', '木', '金', '土'];

  yearOptions = [2024, 2025]; // 必要に応じて拡張

  getCalendarCells(): { date?: Date; minutes?: number; isEmpty?: boolean }[] {
    const cells: { date?: Date; minutes?: number; isEmpty?: boolean }[] = [];

    const start = new Date(this.selectedYear, this.selectedMonth, 1); //選択中の年月の「1日」を表すDateオブジェクトを作成 例：2025年2月 → 2025-02-01
    const end = new Date(this.selectedYear, this.selectedMonth + 1, 0); //例：new Date(2025, 2, 0) → 2025-02-28
    const daysInMonth = end.getDate();
    const startWeekDay = start.getDay();
    //debugger;
    console.log('📅 選択年月:', this.selectedYear, this.selectedMonth + 1);
    console.log('🗓️ この月の1日:', start.toDateString(), '曜日:', startWeekDay);
    console.log('🗓️ この月の末日:', end.toDateString(), '日数:', daysInMonth);

    for (let i = 0; i < startWeekDay; i++) {
      cells.push({ isEmpty: true });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(this.selectedYear, this.selectedMonth, day);
      const dateStr = this.formatDate(currentDate); // ← ここを修正

      const entry = this.entries.find((e) => e.date === dateStr);
      cells.push({
        date: currentDate,
        minutes: entry?.minutes || 0,
      });
    }
    // 末尾の空白セルを追加（行を7個に揃える）
    const remaining = 7 - (cells.length % 7);
    if (remaining < 7) {
      for (let i = 0; i < remaining; i++) {
        cells.push({ isEmpty: true });
      }
    }

    return cells;
  }

  // ⏰ タイムゾーンに左右されない日付文字列を作る
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getLevel(minutes: number): string {
    if (minutes === 0) return 'level-0';
    if (minutes < 30) return 'level-1';
    if (minutes < 60) return 'level-2';
    if (minutes < 120) return 'level-3';
    return 'level-4';
  }
}
