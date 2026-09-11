import { AISuggestion, SchedulingIssue } from '@/types';
import { DEMO_AI_SUGGESTIONS, DEMO_SCHEDULING_ISSUES } from '@/data/demoData';

export class AISuggestionService {
  private suggestions: AISuggestion[] = [...DEMO_AI_SUGGESTIONS];
  private issues: SchedulingIssue[] = [...DEMO_SCHEDULING_ISSUES];

  public getIssues(): SchedulingIssue[] {
    return [...this.issues];
  }

  public getSuggestions(): AISuggestion[] {
    return [...this.suggestions];
  }

  public markSuggestionApplied(suggestionId: string): void {
    this.suggestions = this.suggestions.map((s) => (s.id === suggestionId ? { ...s, applied: true } : s));
    const target = this.suggestions.find((s) => s.id === suggestionId);
    if (target) {
      this.issues = this.issues.map((issue) => (issue.id === target.issueId ? { ...issue, resolved: true } : issue));
    }
  }

  public dismissSuggestion(suggestionId: string): void {
    this.suggestions = this.suggestions.filter((s) => s.id !== suggestionId);
  }

  public getActiveIssuesCount(): number {
    return this.issues.filter((i) => !i.resolved).length;
  }
}

export const aiSuggestionService = new AISuggestionService();
