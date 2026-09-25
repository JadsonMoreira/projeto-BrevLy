export function ProgressBar() {
	return (
		<div
			role="progressbar"
			aria-label="Carregando"
			className="absolute inset-x-0 top-0 h-1 overflow-hidden"
		>
			<div className="h-full w-1/3 animate-progress bg-blue-base" />
		</div>
	);
}
