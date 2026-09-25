import { CircleNotchIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";

interface ExportLinksButtonProps {
	disabled?: boolean;
}

export function ExportLinksButton({ disabled }: ExportLinksButtonProps) {
	return (
		<Button
			variant="secondary"
			disabled={disabled}
			// onClick={() => exportLinksFn()}
		>
			{/* {isPending ? ( */}
			{/* <CircleNotchIcon size={16} className="animate-spin" /> */}
			{/* // ) : ( */}
			<DownloadSimpleIcon size={16} />
			{/* // )} */}
			Baixar CSV
		</Button>
	);
}
