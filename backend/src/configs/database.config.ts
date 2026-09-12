import postgres from "postgres";
import { env } from "../env.js";
import { drizzle } from "drizzle-orm/postgres-js";
import { schemas } from "../db/schemas/index.js";

export const pg = postgres(env.DATABASE_URL);
export const db = drizzle(pg, { schema: schemas });
