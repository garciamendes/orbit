import type { FastifyReply, FastifyRequest } from "fastify";
import { createGoalCompletionSchema } from "../../../useCases/createGoalCompletion/types";
import { createGoalCompletion } from "../../../useCases/createGoalCompletion";

export const createGoalCompletionController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	const { goalId } = createGoalCompletionSchema.parse(request.body);

	await createGoalCompletion({ goalId });
	return reply.status(201).send();
};
