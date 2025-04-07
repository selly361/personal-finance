import { PropsWithChildren } from 'react'
import { Sidebar } from '@/components'

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className='w-screen flex items-start'>
      <Sidebar />
      <main className='px-10 pt-8 pb-6 w-full h-screen flex flex-col gap-8 overflow-y-auto'>
        {children}
      </main>
    </div>
  )
}
