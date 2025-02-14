import './globals.css'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] })

interface Props {
  children: ReactNode;
}

export const metadata = {
  title: 'my-blog',
  description: 'full-stack app',
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="es">
      <body className="bg-white dark:bg-gray-900">{children}</body>
    </html>
  )
}