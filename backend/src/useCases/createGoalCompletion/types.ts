import z from "zod";

export const createGoalCompletionSchema = z.object({
	goalId: z.string().cuid2(),
});
export type CreateGoalCompletion = z.infer<typeof createGoalCompletionSchema>;
