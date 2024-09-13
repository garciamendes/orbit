import { db } from "../../db";
import { goals } from "../../db/schema";
import type { CreateGoal } from "./types";

type ICreateGoalRequest = CreateGoal;

export const createGoal = async ({
	title,
	desiredWeeklyFrequency,
}: ICreateGoalRequest) => {
	const goal = await db
		.insert(goals)
		.values({ title, desiredWeeklyFrequency })
		.returning();

	return { goal: goal[0] };
};
