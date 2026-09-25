import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createLinkService } from "../api/createLinkService";
import { toast } from "sonner";

const createLinkSchema = z.object({
	url: z.string().url("Informe uma URL válida"),
	shortUrl: z
		.string()
		.regex(
			/^[a-z0-9-]+$/,
			"Informe uma url minúscula e sem espaço/caracter especial.",
		),
});

type CreateLinkFormData = z.infer<typeof createLinkSchema>;

export function LinkForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<CreateLinkFormData>({
		mode: "onChange",
		resolver: zodResolver(createLinkSchema),
	});

	const onSubmit: SubmitHandler<CreateLinkFormData> = async (data) => {
		try {
			await createLinkService(data.url, data.shortUrl);

			window.dispatchEvent(new Event("link-created"));
			reset();
		} catch (error: any) {
			const errorMessage = error.response?.data?.message;
			toast.error("Erro no cadastro", {
				description: errorMessage,
			});
		}
	};

	return (
		<form
			className="flex w-full flex-col gap-5 rounded-lg bg-gray-100 p-6 lg:w-110 lg:shrink-0 lg:gap-6 lg:p-8"
			onSubmit={handleSubmit(onSubmit)}
		>
			<h2 className="text-gray-600 text-lg">Novo link</h2>

			<div className="flex flex-col gap-4">
				<Input
					label="link original"
					placeholder="www.exemplo.com.br"
					inputMode="url"
					autoComplete="off"
					autoCapitalize="none"
					spellCheck={false}
					error={errors.url?.message}
					{...register("url")}
				/>

				<Input
					label="link encurtado"
					prefix="brev.ly/"
					autoComplete="off"
					autoCapitalize="none"
					spellCheck={false}
					error={errors.shortUrl?.message}
					{...register("shortUrl")}
				/>
			</div>

			<Button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Salvando..." : "Salvar link"}
			</Button>
		</form>
	);
}
