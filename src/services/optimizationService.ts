import { ScheduleVersion } from '@/types';
import { DEMO_SCHEDULE_VERSIONS } from '@/data/demoData';

export interface OptimizationMetrics {
  hardConstraintPct: number;
  softConstraintPct: number;
  roomUtilizationPct: number;
  studentIdleTimePct: number;
  workloadBalanceScore: number;
  feasibleCandidatesCount: number;
  conflictsResolvedCount: number;
}

export class OptimizationService {
  public getScheduleVersions(): ScheduleVersion[] {
    return DEMO_SCHEDULE_VERSIONS;
  }

  public getBestSchedule(): ScheduleVersion {
    return DEMO_SCHEDULE_VERSIONS.find((s) => s.isBest) || DEMO_SCHEDULE_VERSIONS[1];
  }

  public calculateGenerationMetrics(): OptimizationMetrics {
    return {
      hardConstraintPct: 100,
      softConstraintPct: 94,
      roomUtilizationPct: 88,
      studentIdleTimePct: 6,
      workloadBalanceScore: 92,
      feasibleCandidatesCount: 148,
      conflictsResolvedCount: 12,
    };
  }
}

export const optimizationService = new OptimizationService();
