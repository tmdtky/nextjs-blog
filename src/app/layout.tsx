import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Blog App',
  description: 'Next.js TypeScript Blog Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${inter.className} bg-white`}>
        {/* ヘッダーコンポーネントを全ページ共通で設定 */}
        <Header />
        
        {/* メインコンテンツエリア - 背景色を白に設定 */}
        <main className="min-h-screen bg-white">
          {children}
        </main>
        
        {/* 必要に応じてフッターも追加可能 */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}