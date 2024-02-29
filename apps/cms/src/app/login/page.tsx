import { GithubFilled } from '@ant-design/icons'
import clsx from 'clsx'
import Link from 'next/link'

export default async function LoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center">
      <Link
        href="/login/github"
        className={clsx(
          'bg-bg-primary-inverted flex flex-row items-center gap-2 rounded-sm px-5 py-2 leading-7 outline-none',
          'cursor-pointer hover:opacity-80 active:opacity-20',
          'font-prime text-text-primary-inverted text-lg'
        )}
      >
        <GithubFilled
          className="text-text-primary-inverted inline-flex"
          width="1.75rem"
          height="1.75rem"
        />
        <span className="inline-flex">Sign in with Github</span>
      </Link>
    </div>
  )
}
