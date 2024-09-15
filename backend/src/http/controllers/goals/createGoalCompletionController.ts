import type { FastifyReply, FastifyRequest } from "fastify";
import { createGoalCompletionSchema } from "../../../useCases/createGoalCompletion/types";
import { createGoalCompletion } from "../../../useCases/createGoalCompletion";

export const createGoalCompletionController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { goalId } = createGoalCompletionSchema.parse(request.body);

	try {
		const { goalCompletion } = await createGoalCompletion({ goalId });
		return reply.status(201).send(goalCompletion);
	} catch (error) {
		return reply.status(500).send(error);
	}
};
