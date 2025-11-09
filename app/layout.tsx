import type { Metadata } from 'next'
import './globals.css'
import { Providers } from '@/components/Providers'
import { PWAMeta } from '@/components/PWAMeta'

export const metadata: Metadata = {
  title: 'Gaming Backlog Manager',
  description: 'Track and manage your gaming backlog to avoid spending on games you won\'t play',
  manifest: '/manifest.json',
  themeColor: '#6366f1',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Backlog Manager',
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: 'cover',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <PWAMeta />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
