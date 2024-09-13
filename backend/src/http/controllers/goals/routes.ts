import type { FastifyInstance } from "fastify";
import { createGoalController } from "./createGoalController";
import { getWeekPendingGoalsController } from "./getWeekPendingGoalsController";
import { createGoalCompletionController } from "./createGoalCompletionController";

export const routerGoals = async (app: FastifyInstance) => {
	app.post("/", createGoalController);
	app.get("/", getWeekPendingGoalsController);
	app.post("/completion", createGoalCompletionController);
};
