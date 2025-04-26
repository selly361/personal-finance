import { MobileSidebar, Sidebar } from '@/components'

import { PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <div className='w-screen flex items-start'>
      <Sidebar />
      <main className='px-10 pt-8 pb-4 max-xl:pb-20 w-full h-screen flex flex-col gap-8 overflow-y-auto'>
        {children}
      </main>
      <MobileSidebar />
    </div>
  )
}