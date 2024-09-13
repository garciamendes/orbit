import z from "zod";

export const createGoalSchema = z.object({
	title: z.string(),
	desiredWeeklyFrequency: z.number().positive().min(1),
});
export type CreateGoal = z.infer<typeof createGoalSchema>;
