import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const iconButtonVariants = tv({
	base: "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm bg-gray-200 text-gray-600 ring-blue-base ring-inset transition enabled:hover:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
});

type IconButtonProps = ComponentProps<"button"> & {
	label: string;
};

export function IconButton({
	label,
	className,
	type = "button",
	...props
}: IconButtonProps) {
	return (
		<button
			type={type}
			aria-label={label}
			title={label}
			className={iconButtonVariants({ className })}
			{...props}
		/>
	);
}
