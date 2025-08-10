import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'Next.js + microCMS ブログ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}