import { z } from "zod";

const envSchema = z.object({
	VITE_FRONTEND_URL: z.string().url(),
	VITE_BACKEND_URL: z.string().url(),
});

// No Vite usamos import.meta.env em vez de process.env:
export const env = envSchema.parse(import.meta.env);
