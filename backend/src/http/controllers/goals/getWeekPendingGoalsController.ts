import type { FastifyReply, FastifyRequest } from "fastify";
import { getWeekPendingGoals } from "../../../useCases/getWeekPendingGoals";

export const getWeekPendingGoalsController = async (
	_request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const { pendingGoals } = await getWeekPendingGoals();
		return reply.status(200).send(pendingGoals);
	} catch (error) {
		return reply.status(500).send({ error });
	}
};
