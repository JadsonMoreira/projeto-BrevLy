import { z } from "zod";
import { CircleNotchIcon, CopyIcon, TrashIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { getShortLinkLabel, getShortLinkUrl } from "../utils/shortLink";
import { IconButton } from "./ui/icon-button";
import { useState } from "react";
import { deleteLinkService } from "../api/deleteLinkService";

const numberFormatter = new Intl.NumberFormat("pt-BR");

export function formatAccessCount(accessCount: number) {
	const label = accessCount === 1 ? "acesso" : "acessos";

	return `${numberFormatter.format(accessCount)} ${label}`;
}

export const linkSchema = z.object({
	id: z.string(),
	url: z.string().url(),
	shortUrl: z.string(),
	accesses: z.number(),
	createdAt: z.string(),
});

export type Link = z.infer<typeof linkSchema>;

interface LinkItemProps {
	link: Link;
}

export function LinkItem({ link }: LinkItemProps) {
	const [isDeleting, setDeleting] = useState(false);

	async function deleteLink(id: string) {
		try {
			setDeleting(true);

			await deleteLinkService(id);

			window.dispatchEvent(new Event("link-deleted"));
		} catch (error) {
			console.error("Erro ao deletar links:", error);
		} finally {
			setDeleting(false);
		}
	}

	const shortLinkUrl = getShortLinkUrl(link.shortUrl);

	async function handleCopyLink() {
		try {
			await navigator.clipboard.writeText(shortLinkUrl);
			toast.info("Link copiado com sucesso", {
				description: `O link ${link.shortUrl} foi copiado para a área de transferência.`,
			});
		} catch {
			toast.error("Erro ao copiar", {
				description: "Não foi possível copiar o link.",
			});
		}
	}

	function handleDeleteLink() {
		if (window.confirm(`Você realmente quer apagar o link ${link.shortUrl}?`)) {
			deleteLink(link.id);
		}
	}

	return (
		<div className="flex items-center gap-4 py-0.5 lg:gap-5">
			<div className="flex min-w-0 flex-1 flex-col gap-1">
				<a
					href={shortLinkUrl}
					target="_blank"
					rel="noreferrer"
					className="truncate text-blue-base text-md"
				>
					{getShortLinkLabel(link.shortUrl)}
				</a>
				<span title={link.url} className="truncate text-gray-500 text-sm">
					{link.url}
				</span>
			</div>

			<span className="shrink-0 whitespace-nowrap text-right text-gray-500 text-sm">
				{formatAccessCount(link.accesses)}
			</span>

			<div className="flex shrink-0 gap-1">
				<IconButton
					label={`Copiar link ${link.shortUrl}`}
					onClick={handleCopyLink}
					disabled={isDeleting}
				>
					<CopyIcon size={16} />
				</IconButton>

				<IconButton
					label={`Apagar link ${link.shortUrl}`}
					onClick={handleDeleteLink}
					disabled={isDeleting}
				>
					{isDeleting ? (
						<CircleNotchIcon size={16} className="animate-spin" />
					) : (
						<TrashIcon size={16} />
					)}
				</IconButton>
			</div>
		</div>
	);
}
