import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { getOriginalUrlService } from "../services/getOriginalUrlService.js";

export const getOriginalUrlRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/links/:shortUrl",
		{
			schema: {
				tags: ["Links"],
				summary: "Get original URL",
				description: "Retrieve original link by short URL",
				response: {
					200: z
						.object({
							id: z.string(),
							url: z.string().url(),
							shortUrl: z.string(),
							accesses: z.number(),
							createdAt: z.date(),
						})
						.describe("Original link details"),
					400: z
						.object({ message: z.string() })
						.describe("Failed to retrieve link"),
					404: z.object({ message: z.string() }).describe("Link not found"),
				},
			},
		},
		async (request, reply) => {
			try {
				const { shortUrl } = request.params as { shortUrl: string };

				const response = await getOriginalUrlService(shortUrl);
				return reply.status(200).send(response);
			} catch (error: any) {
				return reply.status(error.statusCode).send({ message: error.message });
			}
		},
	);
};
