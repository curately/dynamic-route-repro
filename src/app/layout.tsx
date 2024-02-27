import '@total-typescript/ts-reset'
import { GeistSans } from 'geist/font/sans'
import { Playfair_Display } from 'next/font/google'

import '@/styles/globals.css'

export const revalidate = 3660

const playfair = Playfair_Display({
  weight: ['400', '500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
  variable: '--header-font',
})

export const metadata = {
  title: 'Family Friendly Hotels',
  description: 'Curated family-friendly-hotels',
}

interface RouteLayoutProps {
  children: React.ReactNode
}
export default function RootLayout({ children }: RouteLayoutProps) {
  return (
    <html lang="en" className="h-full yaiza">
      <body className={`${playfair.variable}  ${GeistSans.variable} h-full font-body`}>{children}</body>
    </html>
  )
}
