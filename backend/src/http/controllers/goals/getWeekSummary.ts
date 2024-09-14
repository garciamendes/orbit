import type { FastifyReply, FastifyRequest } from "fastify";
import { getWeekSummary } from "../../../useCases/getWeekSummary";

export const getWeekSummaryController = async (
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const { summary } = await getWeekSummary();
		return reply.status(200).send(summary);
	} catch (error) {
		return reply.status(500).send({ error });
	}
};
