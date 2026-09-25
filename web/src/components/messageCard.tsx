import type { ReactNode } from "react";

interface MessageCardProps {
	children: ReactNode;
}

export function MessageCard({ children }: MessageCardProps) {
	return (
		<main className="flex min-h-dvh items-center justify-center p-3">
			<div className="flex w-full max-w-145 flex-col items-center gap-6 rounded-lg bg-gray-100 px-5 py-12 text-center lg:px-12 lg:py-16">
				{children}
			</div>
		</main>
	);
}
