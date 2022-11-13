import c from 'clsx'
import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

type Props = {
  href: string
  color?: 'primary' | 'secondary'
  className?: string
  size?: 'normal' | 'large'
}
const ButtonLink: FC<PropsWithChildren<Props>> = (props) => {
  const {
    href,
    children,
    color = 'primary',
    className,
    size = 'normal',
  } = props

  let classNameBase =
    'block mt-2 text-white border rounded-lg bg-primary disabled:bg-gray-200 hover:no-underline font-semibold'
  if (color == 'secondary') {
    classNameBase =
      'block mt-2 text-white border rounded-lg bg-secondary disabled:bg-gray-200 hover:no-underline font-semibold'
  }

  let sizeClasses = 'px-4 py-2 text-base'
  if (size === 'large') {
    sizeClasses = 'px-8 py-4 text-lg uppercase'
  }

  return (
    <Link href={href} className={c(classNameBase, sizeClasses, className)}>
      {children}
    </Link>
  )
}

export default ButtonLink
