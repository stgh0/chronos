import * as XLSX from 'xlsx';
import { TimetableCell } from '@/types';
import { DEMO_TIME_SLOTS } from '@/data/demoData';

export class ExportService {
  public exportToExcel(cells: TimetableCell[], title = 'ATS_University_Timetable'): void {
    if (typeof window === 'undefined') return;

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    const rows: Record<string, string>[] = [];

    days.forEach((day) => {
      const rowData: Record<string, string> = { Day: day };
      DEMO_TIME_SLOTS.forEach((slot) => {
        const cell = cells.find(
          (c) => c.day === day && (c.slotNumber === slot.slotNumber || (c.durationSlots === 2 && c.slotNumber + 1 === slot.slotNumber))
        );
        if (cell) {
          rowData[slot.label] = `${cell.courseName} | ${cell.facultyName} | ${cell.roomName} (${cell.section})`;
        } else {
          rowData[slot.label] = '—';
        }
      });
      rows.push(rowData);
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Timetable');

    // Auto-size columns
    const colWidths = [{ wch: 12 }, ...DEMO_TIME_SLOTS.map(() => ({ wch: 36 }))];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `${title}_${new Date().toISOString().slice(0, 10)}.xlsx`);
  }

  public printTimetable(): void {
    if (typeof window !== 'undefined') {
      window.print();
    }
  }
}

export const exportService = new ExportService();
