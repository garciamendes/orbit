import fastify from "fastify";
import { routerGoals } from "./controllers/goals/routes";
import fastifyCors from "@fastify/cors";
import { env } from "../env";

const app = fastify();

const isProduction = env.NODE_ENV === "production";
app.register(fastifyCors, {
	origin: isProduction
		? [""] // Restrinja apenas às origens de produção permitidas
		: true, // Em desenvolvimento, permitir todas as origens
	methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Métodos permitidos
	credentials: true, // Permitir envio de cookies (útil para autenticação baseada em cookies)
	allowedHeaders: ["Content-Type", "Authorization"], // Defina os headers permitidos
});

app.register(routerGoals, { prefix: "/api/goals" });

app
	.listen({
		host: "0.0.0.0",
		port: 3333,
	})
	.then(() => console.log("HTTP server running!"));
