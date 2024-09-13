import fastify from "fastify";
import { routerGoals } from "./controllers/goals/routes";

const app = fastify();

app.register(routerGoals, { prefix: "/api/goals" });

app
	.listen({
		host: "0.0.0.0",
		port: 3333,
	})
	.then(() => console.log("HTTP server running!"));
