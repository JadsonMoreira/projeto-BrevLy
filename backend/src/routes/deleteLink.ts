import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { deleteLinkService } from "../services/deleteLinkService.js";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.delete(
		"/links/:id",
		{
			schema: {
				tags: ["Links"],
				summary: "Delete a link",
				description: "Delete a link by its ID",
				params: z.object({
					id: z.string().uuid(),
				}),
				response: {
					200: z
						.object({ message: z.string() })
						.describe("Link deleted successfully"),
					400: z
						.object({ message: z.string() })
						.describe("Failed to delete link"),
				},
			},
		},
		async (request, reply) => {
			try {
				const { id } = request.params as { id: string };
				await deleteLinkService(id);
				return reply.status(200).send({ message: "Link deleted successfully" });
			} catch (error: any) {
				return reply.status(400).send({ message: error.message });
			}
		},
	);
};
