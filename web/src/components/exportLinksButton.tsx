import { CircleNotchIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import { exportCsvService } from "../api/exportCsvService";
import { useState } from "react";

interface ExportLinksButtonProps {
	disabled?: boolean;
}

export function ExportLinksButton({ disabled }: ExportLinksButtonProps) {
	const [isExporting, setIsExporting] = useState(false);

	async function exportCsv() {
		try {
			setIsExporting(true);

			const { url, fileName } = await exportCsvService();

			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", fileName || "links.csv");
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("Erro ao buscar links:", error);
		} finally {
			setIsExporting(false);
		}
	}

	return (
		<Button
			variant="secondary"
			disabled={disabled || isExporting}
			onClick={() => exportCsv()}
		>
			{isExporting ? (
				<CircleNotchIcon size={16} className="animate-spin" />
			) : (
				<DownloadSimpleIcon size={16} />
			)}
			Baixar CSV
		</Button>
	);
}
