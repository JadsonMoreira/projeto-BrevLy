import logo from "../assets/Logo.svg";

export function Logo() {
	return (
		<svg
			viewBox="2 1 160 40"
			width={96}
			height={24}
			role="img"
			aria-label="brev.ly"
		>
			<image href={logo} width={162} height={44} />
		</svg>
	);
}
