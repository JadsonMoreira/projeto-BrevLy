import type { ReactNode } from "react";

interface LinkListFeedbackProps {
	icon: ReactNode;
	message: string;
	children?: ReactNode;
}

export function LinkListFeedback({
	icon,
	message,
	children,
}: LinkListFeedbackProps) {
	return (
		<div className="flex flex-col items-center gap-3 border-gray-200 border-t pt-[31px] pb-6 text-center text-gray-400">
			{icon}
			<p className="text-gray-500 text-xs/4.5 uppercase">{message}</p>
			{children}
		</div>
	);
}
