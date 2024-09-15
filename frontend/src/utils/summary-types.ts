export interface ISummary {
	completed: number;
	total: number;
	goalsPerDay: Record<string, IGoalsPerDayValue[]>;
}

export interface IGoalsPerDayValue {
	id: string;
	title: string;
	completedAt: string;
}
