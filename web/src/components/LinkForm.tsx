import { type SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createLinkService } from "../api/createLinkService";
import { toast } from "sonner";
interface IFormInput {
	url: string;
	shortUrl: string;
}

export function LinkForm() {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>({
		mode: "onChange",
	});

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
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
			className="flex w-full flex-col gap-5 rounded-lg bg-gray-100 p-6 lg:w-95 lg:shrink-0 lg:gap-6 lg:p-8"
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
					{...register("url", {
						required: "informe uma url válida",
						pattern: {
							value: /^[a-z][a-z\d+.-]*:\/\//i,
							message: "informe uma url válida",
						},
					})}
				/>

				<Input
					label="link encurtado"
					prefix="brev.ly/"
					autoComplete="off"
					autoCapitalize="none"
					spellCheck={false}
					error={errors.shortUrl?.message}
					{...register("shortUrl", {
						required:
							"informe uma url minúscula e sem espaço/caracter especial.",
						pattern: {
							value: /^[a-z0-9_-]{1,64}$/,
							message:
								"informe uma url minúscula e sem espaço/caracter especial.",
						},
					})}
				/>
			</div>

			<Button type="submit">Salvar link</Button>
		</form>
	);
}
