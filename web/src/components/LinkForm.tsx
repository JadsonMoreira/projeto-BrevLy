import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { type SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
	originalUrl: string;
	shortUrl: string;
}

export function LinkForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		getValues,
	} = useForm<IFormInput>();

	const [originalUrl, shortUrl] = watch(["originalUrl", "shortUrl"]);

	const isButtonDisabled = !originalUrl?.trim() || !shortUrl?.trim();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {};

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
					//   error={errors.originalUrl?.message}
					{...register("originalUrl")}
				/>

				<Input
					label="link encurtado"
					prefix="brev.ly/"
					autoComplete="off"
					autoCapitalize="none"
					spellCheck={false}
					//   error={errors.shortUrl?.message}
					{...register("shortUrl")}
				/>
			</div>

			<Button type="submit" disabled={isButtonDisabled}>
				Salvar link
			</Button>
		</form>
	);
}
