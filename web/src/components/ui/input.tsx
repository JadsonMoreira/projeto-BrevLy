import { WarningIcon } from '@phosphor-icons/react'
import { type ComponentProps, useId } from 'react'
import { tv } from 'tailwind-variants'

const inputVariants = tv({
  slots: {
    label: 'text-gray-500 text-xs uppercase',
    field:
      'flex h-12 items-center rounded-lg px-4 font-normal text-gray-600 text-md ring-1 ring-gray-300 ring-inset',
  },

  variants: {
    hasError: {
      true: {
        label: 'font-bold text-danger',
        field: 'ring-[1.5px] ring-danger',
      },
      false: {
        label: 'group-focus-within:font-bold group-focus-within:text-blue-base',
        field:
          'group-focus-within:ring-[1.5px] group-focus-within:ring-blue-base',
      },
    },
  },
})

type InputProps = Omit<ComponentProps<'input'>, 'prefix'> & {
  label: string
  prefix?: string
  error?: string
}

export function Input({ label, prefix, error, id, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = `${inputId}-error`
  const styles = inputVariants({ hasError: Boolean(error) })

  return (
    <div className="flex flex-col gap-2">
      <label className="group flex flex-col gap-2">
        <span className={styles.label()}>{label}</span>

        <span className={styles.field()}>
          {prefix && <span className="text-gray-400">{prefix}</span>}
          <input
            id={inputId}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? errorId : undefined}
            className="h-full min-w-0 flex-1 truncate bg-transparent caret-blue-base outline-none placeholder:text-gray-400"
            {...props}
          />
        </span>
      </label>

      {error && (
        <p
          id={errorId}
          className="flex items-start gap-2 text-gray-500 text-sm"
        >
          <WarningIcon size={16} className="shrink-0 text-danger" />
          {error}
        </p>
      )}
    </div>
  )
}