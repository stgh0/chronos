export type UserRole = 'admin' | 'coordinator' | 'faculty' | 'student';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleTitle: string;
  department: string;
  avatar?: string;
}

export interface Department {
  id: string;
  code: string;
  name: string;
  head: string;
  totalStudents: number;
  totalFaculty: number;
  programsCount: number;
  roomsCount: number;
}

export interface Program {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  durationYears: number;
  nepTrack: string;
  totalSemesters: number;
}

export type CourseType = 'core' | 'mdm' | 'pec' | 'lab' | 'aec' | 'sec';

export interface Course {
  id: string;
  code: string;
  name: string;
  departmentId: string;
  credits: number;
  type: CourseType;
  semester: number;
  year: 'FY' | 'SY' | 'TY' | 'Final Year';
  weeklyLectures: number;
  weeklyLabs: number;
  facultyId: string;
  facultyName: string;
  preferredRoomType: 'classroom' | 'lab';
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  departmentId: string;
  email: string;
  phone: string;
  maxHoursPerWeek: number;
  currentHours: number;
  preferredSlots: string[];
  offDays: string[];
  coursesTaught: string[];
  workloadStatus: 'optimal' | 'light' | 'overloaded';
}

export type RoomType = 'classroom' | 'lab' | 'seminar';

export interface Room {
  id: string;
  code: string;
  name: string;
  building: string;
  floor: number;
  capacity: number;
  type: RoomType;
  equipment: string[];
  departmentId: string;
  isAvailable: boolean;
}

export interface StudentGroup {
  id: string;
  code: string;
  name: string;
  year: 'FY' | 'SY' | 'TY' | 'Final Year';
  division: 'A' | 'B' | 'C';
  departmentId: string;
  programId: string;
  strength: number;
}

export interface TimeSlot {
  slotNumber: number;
  startTime: string;
  endTime: string;
  label: string;
  isBreak?: boolean;
}

export interface LunchBreakSlot {
  year: 'SY' | 'TY';
  slotNumber: number;
}

export interface LunchConfig {
  sySlots: number[];
  tySlots: number[];
}

export interface MDMSlotSelection {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  slotNumber: number;
  type: 'lab' | 'theory';
  group?: string;
}

export type CellType = 'lecture' | 'lab' | 'mdm' | 'pec' | 'lunch' | 'ai_recommended';

export interface TimetableCell {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  slotNumber: number;
  courseId: string;
  courseName: string;
  courseCode: string;
  facultyId: string;
  facultyName: string;
  roomId: string;
  roomName: string;
  studentGroupId: string;
  section: string; // e.g. "SY-A", "TY-B"
  type: CellType;
  durationSlots: number; // 1 or 2 for lab
  isConflict?: boolean;
  conflictReason?: string;
  isAIRecommended?: boolean;
  note?: string;
}

export type ConstraintCategory = 'hard' | 'soft';
export type ConstraintScope = 'faculty' | 'room' | 'student' | 'curriculum';

export interface Constraint {
  id: string;
  code: string;
  title: string;
  description: string;
  category: ConstraintCategory;
  scope: ConstraintScope;
  isEnabled: boolean;
  weight: number; // 1-10 for soft constraints
  isCustom?: boolean;
}

export interface SchedulingIssue {
  id: string;
  issueNumber: number;
  title: string;
  courseName: string;
  facultyName?: string;
  required: string;
  problem: string;
  severity: 'high' | 'medium' | 'low';
  possibleSolutions: string[];
  aiSuggestion: string;
  resolved: boolean;
  targetCellId?: string;
}

export interface AISuggestion {
  id: string;
  issueId: string;
  title: string;
  actionType: 'move_slot' | 'change_room' | 'swap_faculty' | 'rebalance_workload';
  targetCourse: string;
  currentDay: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  currentSlot: string;
  proposedDay: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  proposedSlot: string;
  currentRoom?: string;
  proposedRoom?: string;
  reasoning: string;
  impact: string;
  applied: boolean;
}

export interface ScheduleVersion {
  id: string;
  name: string;
  hardConstraintPct: number;
  softConstraintPct: number;
  roomUtilizationPct: number;
  idleTimePct: number;
  workloadBalancePct: number;
  isBest: boolean;
  createdAt: string;
  description: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  actionUrl?: string;
}

export interface GenerationStep {
  step: number;
  title: string;
  status: 'pending' | 'in_progress' | 'completed';
  detail: string;
}
