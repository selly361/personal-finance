import { PropsWithChildren } from 'react'
import { Sidebar } from '@/components'

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className='w-screen flex items-start'>
      <Sidebar />
      <main className='px-10 pt-8 w-full h-screen'>{children}</main>
    </div>
  )
}
