import { and, count, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../../db";
import { goals, goalsCompletions } from "../../db/schema";
import type { CreateGoalCompletion } from "./types";
import dayjs from "dayjs";

type ICreateGoalCompletionRequest = CreateGoalCompletion;

export const createGoalCompletion = async ({
	goalId,
}: ICreateGoalCompletionRequest) => {
	const firstDayOfWeek = dayjs().startOf("week").toDate();
	const lastDayOfWeek = dayjs().endOf("week").toDate();

	const goalsCompletionCounts = db.$with("goals_completion_counts").as(
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
					eq(goalsCompletions.goalId, goalId),
				),
			)
			.groupBy(goalsCompletions.goalId),
	);

	const _result = await db
		.with(goalsCompletionCounts)
		.select({
			desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
			completionCount: sql`
        COALESCE(${goalsCompletionCounts.completationCount}, 0)
      `.mapWith(Number),
		})
		.from(goals)
		.leftJoin(goalsCompletionCounts, eq(goalsCompletionCounts.goalId, goals.id))
		.where(eq(goals.id, goalId));

	const { desiredWeeklyFrequency, completionCount } = _result[0];

	if (completionCount >= desiredWeeklyFrequency)
		throw new Error("Goal already completed this week");

	const result = await db
		.insert(goalsCompletions)
		.values({ goalId })
		.returning();

	return { goalCompletion: result[0] };
};
