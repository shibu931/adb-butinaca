import ProductCard from '@/Components/ProductCard'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      <section className='px-6 md:px-20'>
        <ProductCard />
      </section>
    </>
  )
}
