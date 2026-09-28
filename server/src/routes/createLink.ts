import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { createLinkService } from "../services/createLinkService.js";

export const createLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/links",
		{
			schema: {
				tags: ["Links"],
				summary: "Create a new link",
				description: "Create a new link with the provided data",
				body: z.object({
					urlOriginal: z.string().url(),
					shortUrl: z.string(),
				}),
				response: {
					201: z.object({ message: z.string() }),
					400: z
						.object({ message: z.string() })
						.describe("Falha ao criar a URL"),
				},
			},
		},
		async (request, reply) => {
			try {
				await createLinkService({
					originalUrl: request.body.urlOriginal,
					shortUrl: request.body.shortUrl || "",
				});
				return reply.status(201).send({ message: "URL criada com sucesso" });
			} catch (error: any) {
				return reply.status(400).send({ message: error.message });
			}
		},
	);
};
