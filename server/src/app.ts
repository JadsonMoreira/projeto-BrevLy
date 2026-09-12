import { fastify } from "fastify";
import { env } from "./env.js";
import { fastifyCors } from "@fastify/cors";
import {
	serializerCompiler,
	validatorCompiler,
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { createLinkRoute } from "./routes/createLink.js";
import fastifySwagger from "@fastify/swagger";
import fastifyMultipart from "@fastify/multipart";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { listLinksRoute } from "./routes/listLinks.js";
import { deleteLinkRoute } from "./routes/deleteLink.js";
import { increaseAccessToLinkRoute } from "./routes/IncreaseAccessToLink.js";
import { exportLinksRoute } from "./routes/exportCSVLinks.js";
import { getOriginalUrlRoute } from "./routes/getOriginalUrl.js";

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		return reply.status(400).send({
			message: "Validation error",
			errors: error.validation,
		});
	}

	console.error(error);

	return reply.status(500).send({
		message: "Internal server error",
	});
});

app.register(fastifyCors, { origin: "*",
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
 });

app.register(fastifyMultipart);
app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "BrevLy API",
			description: "API for BrevLy project FTR",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});
app.register(fastifySwaggerUi, { routePrefix: "/docs" });

app.register(createLinkRoute);
app.register(listLinksRoute);
app.register(deleteLinkRoute);
app.register(increaseAccessToLinkRoute);
app.register(exportLinksRoute);
app.register(getOriginalUrlRoute);

app
	.listen({
		port: env.PORT,
		host: "0.0.0.0",
	})
	.then(() => {
		console.log("HTTP server running on http://localhost:" + env.PORT);
	});
