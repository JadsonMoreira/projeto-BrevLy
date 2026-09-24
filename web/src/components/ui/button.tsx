import type { ComponentProps } from 'react'
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'flex shrink-0 cursor-pointer items-center justify-center whitespace-nowrap transition disabled:cursor-not-allowed disabled:opacity-50',

  variants: {
    variant: {
      primary:
        'h-12 gap-3 rounded-lg bg-blue-base px-5 text-md text-white enabled:hover:bg-blue-dark',
      secondary:
        'h-8 gap-1.5 rounded-sm bg-gray-200 px-2 font-semibold text-gray-500 text-sm ring-blue-base ring-inset enabled:hover:ring-1 [&_svg]:shrink-0 [&_svg]:text-gray-600',
    },
  },

  defaultVariants: {
    variant: 'primary',
  },
})

type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

export function Button({
  variant,
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonVariants({ variant, className })}
      {...props}
    />
  )
}