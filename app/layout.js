import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/Components/Navbar'
import Footer from '@/Components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ADB Butinaca',
  description: 'We Sell ADB Butinaca',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/assets/img/favicon.ico" />
        </head>
      <body className={inter.className}>
        <header className='max-w-10xl mx-auto'>
          <Navbar/>
        </header>
        <main className='max-w-10xl mx-auto'>
          {children}
        </main>
        <footer>
          <Footer/>
        </footer>
      </body>
    </html>
  )
}
