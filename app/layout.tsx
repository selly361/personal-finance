import './globals.css'

import { Metadata } from 'next'
import { PropsWithChildren } from 'react'
import { Public_Sans } from 'next/font/google'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: {
    template: '%s | Finance',
    default: 'Finance',
  },
  description:
    'A smarter way to track spending, manage budgets, and stay in control of your finances.',
}

const public_sans = Public_Sans({ subsets: ['latin'] })

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(public_sans.className, 'overflow-x-hidden')}>
        {children}
      </body>
    </html>
  )
}
