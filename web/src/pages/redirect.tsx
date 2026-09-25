import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoIcon from "../assets/Logo_Icon.svg";
import { MessageCard } from "../components/messageCard";
import { countLinkAccessService } from "../api/countLinkAccessService";
import { getLinkService } from "../api/getLinkService";

export function Redirect() {
	const { shortUrl = "" } = useParams();
	const navigate = useNavigate();
	const [url, setUrl] = useState<string>();

	useEffect(() => {
		if (!/^[a-z0-9_-]{1,64}$/.test(shortUrl)) {
			navigate("/url/not-found", { replace: true });
			return;
		}

		async function handleRedirect() {
			try {
				const link = await getLinkService(shortUrl);

				if (!link?.url) {
					navigate("/url/not-found", { replace: true });
					return;
				}

				if (new URL(link.url).host === window.location.host) {
					navigate("/url/not-found", { replace: true });
					return;
				}

				setUrl(link.url);

				await countLinkAccessService(link.id).catch(() => null);

				const channel = new BroadcastChannel("links_channel");
				channel.postMessage("link-accessed");
				channel.close();

				window.location.replace(link.url);
			} catch {
				navigate("/url/not-found", { replace: true });
			}
		}

		handleRedirect();
	}, [shortUrl, navigate]);

	return (
		<MessageCard>
			<img src={logoIcon} alt="" className="size-12" />

			<h1 className="text-gray-600 text-xl">Redirecionando...</h1>

			<div className="flex flex-col gap-1 text-gray-500 text-md">
				<p>O link será aberto automaticamente em alguns instantes.</p>
				<p>
					Não foi redirecionado?{" "}
					<a href={url} className="text-blue-base underline">
						Acesse aqui
					</a>
				</p>
			</div>
		</MessageCard>
	);
}
