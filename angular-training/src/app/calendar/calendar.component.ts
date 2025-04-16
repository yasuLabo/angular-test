import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type CalendarEntry={
  date:string;
  minutes:number;
}

@Component({
  selector: 'app-calendar',
  imports: [CommonModule,FormsModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  @Input() entries:CalendarEntry[]=[];
  selectedYear:number=new Date().getFullYear();
  selectedMonth:number=new Date().getMonth();
  monthOptions = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];
  
  yearOptions = [2024, 2025]; // 必要に応じて拡張
  
  getCalendarCells(): { date?: Date; minutes?: number; isEmpty?: boolean }[] {
    const cells: { date?: Date; minutes?: number; isEmpty?: boolean }[] = [];
  
    const start = new Date(this.selectedYear, this.selectedMonth, 1);
    const end = new Date(this.selectedYear, this.selectedMonth + 1, 0); // 月末
  
    // 空白セル（曜日合わせ）
    const startWeekDay = start.getDay();
    for (let i = 0; i < startWeekDay; i++) {
      cells.push({ isEmpty: true });
    }
  
    // 🔒 安全なループ：ループ変数を直接操作せず、カウンタで新しいDateを生成
    const daysInMonth = end.getDate();
    for (let i = 0; i < daysInMonth; i++) {
      const currentDate = new Date(this.selectedYear, this.selectedMonth, i + 1);
      const dateStr = currentDate.toISOString().substring(0, 10);
      const entry = this.entries.find(e => e.date === dateStr);
  
      cells.push({
        date: currentDate,
        minutes: entry?.minutes || 0
      });
    }
  
    return cells;
  }
  
  
  
  getLevel(minutes: number): string {
    if (minutes === 0) return 'level-0';
    if (minutes < 30) return 'level-1';
    if (minutes < 60) return 'level-2';
    if (minutes < 120) return 'level-3';
    return 'level-4';
  }
  
}
