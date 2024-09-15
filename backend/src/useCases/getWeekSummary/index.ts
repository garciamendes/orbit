import { and, desc, eq, gte, lte, sql } from "drizzle-orm";
import { db } from "../../db";
import { goals, goalsCompletions } from "../../db/schema";
import dayjs from "dayjs";

export const getWeekSummary = async () => {
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

	const goalsCompletedInWeek = db.$with("goals_completed_in_week").as(
		db
			.select({
				id: goalsCompletions.id,
				title: goals.title,
				completedAt: goalsCompletions.createdAt,
				completedAtDate: sql`
          DATE(${goalsCompletions.createdAt})
        `.as("completedAtDate"),
			})
			.from(goalsCompletions)
			.innerJoin(goals, eq(goals.id, goalsCompletions.goalId))
			.where(
				and(
					gte(goalsCompletions.createdAt, firstDayOfWeek),
					lte(goalsCompletions.createdAt, lastDayOfWeek),
				),
			)
			.orderBy(desc(goalsCompletions.createdAt)),
	);

	const goalsCompletedByWeekDay = db.$with("goals_completed_by_week_day").as(
		db
			.select({
				completedAtDate: goalsCompletedInWeek.completedAtDate,
				completions: sql`
            JSON_AGG(
              JSON_BUILD_OBJECT(
                'id', ${goalsCompletedInWeek.id},
                'title', ${goalsCompletedInWeek.title},
                'completedAt', ${goalsCompletedInWeek.completedAt}
              )
            )
          `.as("completions"),
			})
			.from(goalsCompletedInWeek)
			.groupBy(goalsCompletedInWeek.completedAtDate)
			.orderBy(desc(goalsCompletedInWeek.completedAtDate)),
	);

	const result = await db
		.with(goalsCreateUpToWeek, goalsCompletedInWeek, goalsCompletedByWeekDay)
		.select({
			completed: sql`
        (SELECT COUNT(*) FROM ${goalsCompletedInWeek})
      `.mapWith(Number),
			total:
				sql`(SELECT SUM(${goalsCreateUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCreateUpToWeek})`.mapWith(
					Number,
				),
			goalsPerDay: sql`
        JSON_OBJECT_AGG(
          ${goalsCompletedByWeekDay.completedAtDate}, ${goalsCompletedByWeekDay.completions}
        )
      `,
		})
		.from(goalsCompletedByWeekDay);

	return { summary: result[0] };
};
