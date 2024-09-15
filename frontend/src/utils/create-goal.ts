import z from "zod";

export const createGoalSchema = z.object({
	title: z
		.string()
		.min(1, { message: "Informe a atividade que deseja realizar" }),
	desiredWeeklyFrequency: z.coerce.number().positive().min(1).max(7),
});
export type CreateGoal = z.infer<typeof createGoalSchema>;
