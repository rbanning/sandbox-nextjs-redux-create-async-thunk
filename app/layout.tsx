import { Providers } from '@/store/providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NextJs 13 Sandbox',
  description: 'Sandbox by Hallpass and Friends',
}

const preventGrammarlyCausedAttributeWarning = true; //see https://stackoverflow.com/questions/75337953/what-causes-nextjs-warning-extra-attributes-from-the-server-data-new-gr-c-s-c

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-100 text-slate-700`} suppressHydrationWarning={preventGrammarlyCausedAttributeWarning} >
        <Providers>
          <main className="max-w-2xl mx-auto p-9 shadow-md bg-slate-50">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
