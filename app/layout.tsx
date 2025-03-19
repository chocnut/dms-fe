import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from './registry'
import { Providers } from './providers'
import '@fortawesome/fontawesome-svg-core/styles.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Document Management System',
  description: 'A modern document management system',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
