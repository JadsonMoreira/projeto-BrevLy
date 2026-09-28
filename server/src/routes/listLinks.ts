import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../configs/database.config.js";
import { schemas } from "../db/schemas/index.js";
import { createLinkService } from "../services/createLinkService.js";
import { listLinksService } from "../services/listLinksService.js";

export const listLinksRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/links",
		{
			schema: {
				tags: ["Links"],
				summary: "List all links",
				description: "Retrieve a list of all links",
				response: {
					200: z
						.array(
							z.object({
								id: z.string(),
								url: z.string().url(),
								shortUrl: z.string(),
								accesses: z.number(),
								createdAt: z.date(),
							}),
						)
						.describe("Lista de URLs"),
					400: z
						.object({ message: z.string() })
						.describe("Falha ao listar as URLs"),
				},
			},
		},
		async (request, reply) => {
			try {
				const response = await listLinksService();
				return reply.status(200).send(response);
			} catch (error: any) {
				return reply.status(400).send({ message: error.message });
			}
		},
	);
};
