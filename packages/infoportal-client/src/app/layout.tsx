import {Inter} from 'next/font/google'
import MuiXLicense from '@/core/MuiXLicense'

const inter = Inter({subsets: ['latin']})

export const metadata = {
  title: 'DRC - Information Management',
  description: 'DRC - Information Management tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>
    {children}
    <MuiXLicense/>
    </body>
    </html>
  )
}
