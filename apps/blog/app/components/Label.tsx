import cx from 'clsx'

const colors = {
  green: 'text-emerald-700',
  blue: 'text-blue-600',
  orange: 'text-orange-700',
  purple: 'text-purple-600',
  pink: 'text-pink-600',
}
const bgcolors = {
  green: 'bg-emerald-50',
  blue: 'bg-blue-50',
  orange: 'bg-orange-50',
  purple: 'bg-purple-50',
  pink: 'bg-pink-50',
}

interface Props {
  pill?: boolean
  color?: keyof typeof colors
  nomargin?: boolean
  children: React.ReactNode
}

export function Label({ pill, color, nomargin, children }: Props) {
  if (pill) {
    return (
      <div
        className={
          'inline-flex h-6 shrink-0 items-center justify-center rounded-full bg-blue-50 px-2 text-sm font-bold text-blue-500 dark:bg-gray-800 dark:text-gray-300'
        }
      >
        {children}
      </div>
    )
  }

  return (
    <span
      className={cx(
        'inline-block text-xs font-medium uppercase tracking-wider ',
        !nomargin && ' mt-5',
        color[color] || colors.pink
      )}
    >
      {children}
    </span>
  )
}
