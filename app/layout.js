import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '/Components/Navbar'
import Footer from '/Components/Footer'
import Link from 'next/link'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ADB Butinaca',
  description: 'We Sell ADB Butinaca',
}

const img = {
  logo:{
    path:'/assets/img/logo.png',
    alt:'ADB Butinaca'
  },
  user:'/assets/img/user-icon.png',
  cart:'/assets/img/cart-icon.png',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="icon" href="/assets/img/favicon.ico" />
        </head>
      <body className={`inter.className max-w-10xl mx-auto`}>
        
        <header>
          <Navbar img={img} />
        </header>
        
        <main>
          {children}
        </main>
        
        <footer>
          <Footer img={img}/>
        </footer>
        <div>
          <Link href="https://t.me/legaldarkbuzzen" target='_blank' className="fixed bottom-5 right-6 animate-bounce">
          <Image
          width={50}
          height={50}
          alt='telegram'
            src="/assets/img/telegram.png"
          />
          </Link>
        </div>
      </body>
    </html>
  )
}
