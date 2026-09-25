import axios from "axios";
import { env } from "../env";

console.log(env.VITE_BACKEND_URL, "env.VITE_BACKEND_URLenv.VITE_BACKEND_URL");
export const api = axios.create({
	baseURL: env.VITE_BACKEND_URL,
});
