import type { FastifyReply, FastifyRequest } from "fastify";
import { createGoal } from "../../../useCases/createGoal";
import { createGoalSchema } from "../../../useCases/createGoal/types";

export const createGoalController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { title, desiredWeeklyFrequency } = createGoalSchema.parse(
		request.body,
	);

	try {
		const { goal } = await createGoal({ title, desiredWeeklyFrequency });
		return reply.status(201).send(goal);
	} catch (error) {
		return reply.status(500).send(error);
	}
};
