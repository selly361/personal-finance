import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className='max-w-7xl flex flex-col gap-12 items-start'>
      <header>Sidebar</header>
      {children}
    </div>
  )
}
