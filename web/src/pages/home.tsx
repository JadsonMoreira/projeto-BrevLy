import { LinkForm } from "../components/linkForm";
import { LinkList } from "../components/linkList";
import { Logo } from "../components/logo";

export function Home() {
	return (
		<main className="mx-auto flex w-full max-w-151 flex-col gap-6 px-3 py-8 lg:h-dvh lg:max-w-251 lg:gap-8 lg:pt-22">
			<div className="self-center lg:self-start">
				<Logo />
			</div>

			<div className="flex flex-col gap-3 lg:min-h-0 lg:flex-1 lg:flex-row lg:items-start lg:gap-5">
				<LinkForm />
				<LinkList />
			</div>
		</main>
	);
}
