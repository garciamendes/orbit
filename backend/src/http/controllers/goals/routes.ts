import type { FastifyInstance } from "fastify";
import { createGoalController } from "./createGoalController";
import { getWeekPendingGoalsController } from "./getWeekPendingGoalsController";
import { createGoalCompletionController } from "./createGoalCompletionController";
import { getWeekSummaryController } from "./getWeekSummary";

export const routerGoals = async (app: FastifyInstance) => {
	app.post("/", createGoalController);
	app.get("/", getWeekPendingGoalsController);
	app.get("/summary", getWeekSummaryController);
	app.post("/completion", createGoalCompletionController);
};
