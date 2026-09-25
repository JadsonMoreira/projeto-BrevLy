import { CircleNotchIcon, LinkIcon } from "@phosphor-icons/react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { listAllLinksService } from "../api/listAllLinksService";
import { ExportLinksButton } from "./exportLinksButton";
import { LinkItem, type Link } from "./linkItem";
import { LinkListFeedback } from "./linkListFeedback";
import { ProgressBar } from "./ui/progressBar";

export function LinkList() {
	const [links, setLinks] = useState<Link[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	async function loadLinks() {
		try {
			setIsLoading(true);

			const data = await listAllLinksService();

			const formattedLinks: Link[] = (data || []).map((item: Link) => ({
				id: item.id,
				url: item.url,
				shortUrl: item.shortUrl,
				accesses: item.accesses,
				createdAt: item.createdAt,
			}));

			setLinks(formattedLinks);
		} catch (error) {
			console.error("Erro ao buscar links:", error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		loadLinks();

		const channel = new BroadcastChannel("links_channel");
		channel.onmessage = () => {
			loadLinks();
		};

		window.addEventListener("link-created", loadLinks);
		window.addEventListener("link-deleted", loadLinks);

		// Limpa o ouvinte quando o componente for desmontado
		return () => {
			channel.close();
			window.removeEventListener("link-created", loadLinks);
			window.removeEventListener("link-deleted", loadLinks);
		};
	}, []);

	function renderLinks() {
		if (isLoading) {
			return (
				<LinkListFeedback
					icon={<CircleNotchIcon size={32} className="animate-spin" />}
					message="carregando links..."
				/>
			);
		}

		if (links.length > 0) {
			return (
				<ul className="flex flex-col gap-3 lg:gap-4">
					{links.map((link) => (
						<li
							key={link.id}
							className="border-gray-200 border-t pt-[11px] lg:pt-[15px]"
						>
							<LinkItem link={link} />
						</li>
					))}
				</ul>
			);
		}

		return (
			<LinkListFeedback
				icon={<LinkIcon size={32} />}
				message="ainda não existem links cadastrados"
			/>
		);
	}

	return (
		<section className="relative flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-gray-100 p-6 lg:max-h-full lg:w-145 lg:gap-5 lg:p-8">
			{isLoading && <ProgressBar />}

			<header className="flex items-center justify-between gap-4">
				<h2 className="text-gray-600 text-lg">Meus links</h2>
				<ExportLinksButton disabled={!links.length} />
			</header>

			<ScrollArea.Root
				type="auto"
				className="-ml-1 -mr-6 flex min-h-0 flex-col overflow-hidden lg:-mr-8"
			>
				<ScrollArea.Viewport className="pl-1 pr-6 lg:pr-8 [&>div]:block!">
					{renderLinks()}
				</ScrollArea.Viewport>

				<ScrollArea.Scrollbar
					orientation="vertical"
					className="flex w-2 touch-none select-none p-0.5"
				>
					<ScrollArea.Thumb className="flex-1 rounded-full bg-blue-base" />
				</ScrollArea.Scrollbar>
			</ScrollArea.Root>
		</section>
	);
}
