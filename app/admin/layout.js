import { EdgeStoreProvider } from '/lib/edgestore'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Admin',
  description: 'We Sell ADB Butinaca',
}

export default function RootLayout({ children }) {
  return (
        <main>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </main>
  )
}
