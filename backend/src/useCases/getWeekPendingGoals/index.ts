import dayjs from "dayjs";
import weekOfyear from "dayjs/plugin/weekOfYear";
import { db } from "../../db";
import { goals, goalsCompletions } from "../../db/schema";
import { and, count, eq, gte, lte, sql } from "drizzle-orm";
dayjs.extend(weekOfyear);

export const getWeekPendingGoals = async () => {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	const goalsCreateUpToWeek = db.$with("goals_create_up_to_week").as(
		db
			.select({
				id: goals.id,
				title: goals.title,
				desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
				createdAt: goals.createdAt,
			})
			.from(goals)
			.where(lte(goals.createdAt, lastDayOfWeek)),
	);

	const goalsCompletionCounts = db.$with("goals_completion_count").as(
		db
			.select({
				goalId: goalsCompletions.goalId,
				completationCount: count(goalsCompletions.id).as("completationCount"),
			})
			.from(goalsCompletions)
			.where(
				and(
					gte(goalsCompletions.createdAt, firstDayOfWeek),
					lte(goalsCompletions.createdAt, lastDayOfWeek),
				),
			)
			.groupBy(goalsCompletions.goalId),
	);

	const pendingGoals = await db
		.with(goalsCreateUpToWeek, goalsCompletionCounts)
		.select({
			id: goalsCreateUpToWeek.id,
			title: goalsCreateUpToWeek.title,
			desiredWeeklyFrequency: goalsCreateUpToWeek.desiredWeeklyFrequency,
			completionCount: sql`
        COALESCE(${goalsCompletionCounts.completationCount}, 0)
      `.mapWith(Number),
		})
		.from(goalsCreateUpToWeek)
		.leftJoin(
			goalsCompletionCounts,
			eq(goalsCompletionCounts.goalId, goalsCreateUpToWeek.id),
		);

	return {
		pendingGoals,
	};
};
