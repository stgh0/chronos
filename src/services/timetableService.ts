import { TimetableCell, TimeSlot } from '@/types';
import { INITIAL_TIMETABLE_CELLS, DEMO_TIME_SLOTS } from '@/data/demoData';

export interface TimetableFilter {
  department?: string;
  program?: string;
  year?: string;
  division?: string;
  facultyId?: string;
  roomId?: string;
  day?: string;
}

export class TimetableService {
  private cells: TimetableCell[] = [...INITIAL_TIMETABLE_CELLS];

  public getAllCells(): TimetableCell[] {
    return [...this.cells];
  }

  public getTimeSlots(): TimeSlot[] {
    return [...DEMO_TIME_SLOTS];
  }

  public getFilteredCells(filter: TimetableFilter): TimetableCell[] {
    return this.cells.filter((cell) => {
      if (filter.day && filter.day !== 'All' && cell.day !== filter.day) return false;
      if (filter.division && filter.division !== 'All' && cell.section !== filter.division && !cell.section.startsWith(filter.division)) return false;
      if (filter.facultyId && filter.facultyId !== 'All' && cell.facultyId !== filter.facultyId) return false;
      if (filter.roomId && filter.roomId !== 'All' && cell.roomId !== filter.roomId) return false;
      return true;
    });
  }

  public getCell(day: string, slotNumber: number, section?: string): TimetableCell | undefined {
    return this.cells.find((c) => {
      const matchDay = c.day === day;
      const matchSlot = c.slotNumber === slotNumber || (c.durationSlots === 2 && c.slotNumber + 1 === slotNumber);
      const matchSection = section ? (c.section === section || c.section.startsWith(section)) : true;
      return matchDay && matchSlot && matchSection;
    });
  }

  public updateCell(updatedCell: TimetableCell): void {
    this.cells = this.cells.map((c) => (c.id === updatedCell.id ? updatedCell : c));
  }

  public applySuggestion(suggestionId: string): { success: boolean; message: string } {
    if (suggestionId === 'sug-1') {
      // Move Advanced AI from Wednesday slot 4 to Thursday slot 8 Lab-1
      this.cells = this.cells.filter((c) => c.id !== 'c-w4');
      this.cells.push({
        id: 'c-th8-ai',
        day: 'Thursday',
        slotNumber: 8,
        courseId: 'crs-adv-ai',
        courseName: 'Advanced AI & Deep Learning Lab',
        courseCode: 'CE-401',
        facultyId: 'fac-1',
        facultyName: 'Dr. Suresh Kulkarni',
        roomId: 'room-lab1',
        roomName: 'Lab-1',
        studentGroupId: 'grp-sy-a',
        section: 'SY-A',
        type: 'lab',
        durationSlots: 2,
        isAIRecommended: true,
        note: 'Optimized via ATS AI Assistant (Dr. Suresh Kulkarni Thursday slot)',
      });
      return { success: true, message: 'Advanced AI lab shifted to Thursday Slot 8 & 9 in Lab-1. Conflict resolved!' };
    }

    if (suggestionId === 'sug-2') {
      // Switch Database Lab from Lab-2 to Lab-3
      this.cells = this.cells.map((c) => {
        if (c.id === 'c-t6') {
          return {
            ...c,
            roomId: 'room-lab3',
            roomName: 'Lab-3 (Database Systems)',
            isConflict: false,
            conflictReason: undefined,
            isAIRecommended: true,
            note: 'Reallocated to Lab-3 by ATS AI: dedicated PostgreSQL host.',
          };
        }
        return c;
      });
      return { success: true, message: 'Database Lab moved to Lab-3. Lab collision resolved!' };
    }

    if (suggestionId === 'sug-3') {
      // Adjust MDM IoT Slot from Mon Slot 2 to Mon Slot 1
      this.cells = this.cells.map((c) => {
        if (c.id === 'c-m2') {
          return {
            ...c,
            slotNumber: 1,
            isConflict: false,
            conflictReason: undefined,
            isAIRecommended: true,
            note: 'Synchronized with ECE timetable in Slot 1.',
          };
        }
        if (c.id === 'c-m1') {
          return {
            ...c,
            slotNumber: 2,
          };
        }
        return c;
      });
      return { success: true, message: 'MDM IoT shifted to Slot 1. Cross-department conflict resolved!' };
    }

    return { success: false, message: 'Unknown suggestion ID' };
  }

  public resetToDefault(): void {
    this.cells = [...INITIAL_TIMETABLE_CELLS];
  }
}

export const timetableService = new TimetableService();
