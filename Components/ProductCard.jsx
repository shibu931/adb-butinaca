'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { StarIcon } from "@heroicons/react/20/solid";



const product = {
  title:'ADB-Butinaca',
  description:'ADB-Butinaca (ADBB) is an indole-based synthetic cannabinoid, a structural analog of MDMB-BUTINACA and a potent CB1 and CB2 receptor agonist (reported EC50 values of 0.52 nM and 0.88 nM).',
  description2:'You can get acquainted with the prices and buy ADB-Butinaca online right now, at OnmiChemistry company. We provide all the necessary information about the products and provide a quality guarantee.',
  img:'',
  price:'',
  discountedPrice:'12.44'
}

const ProductCard = () => {
  const [item,setItem] = useState(1)
  const decrementItem = ()=>{
    if(item > 0) setItem(item-1);
  }
  const incrementItem = ()=>{
    if(item < 30) setItem(item+1);
  }
  return (
    <div className='my-10 flex flex-wrap gap-10 md:gap-20 md:flex-nowrap'>
        <div className='md:w-1/2'>
          <Image
            src="https://placehold.co/440x650"
            alt="Product Image"
            height={650}
            width={440}
          />
        </div>
        <div className='text-gray-100 flex flex-col justify-center'>
          <span className='text-gray-500 text-sm md:text-lg'>Research Chemicals</span>
          <h1 className='text-4xl md:text-6xl font-medium'><span className='bg-gradient-to-r to-purple-500 from-violet-800 text-transparent bg-clip-text'>{product.title}</span></h1>
          <div className="flex mt-2">
          <StarIcon class="h-6 w-6 text-yellow-500" />
          <StarIcon class="h-6 w-6 text-yellow-500" />
          <StarIcon class="h-6 w-6 text-yellow-500" />
          <StarIcon class="h-6 w-6 text-yellow-500" />
          <StarIcon class="h-6 w-6 text-yellow-500" />
          </div>
          <Link
          className='hover:underline'
            href="/reviews"          
          >
            123 <span className='bg-yellow-400 font-extrabold text-transparent bg-clip-text'>Reviews</span>
          </Link>
          <p className='text-md mt-6'>{product.description}</p>
          <p className='text-md mt-4'>{product.description2}</p>  
          <h2 className='text-4xl mt-5 font-semibold'>&#x20AC; {product.discountedPrice}</h2>
          <span className='text-xl'>&#x20AC; <del>24</del></span>
          <div className="flex gap-5 flex-grow-0">
          <div className='flex mt-10'>
            <button className='bg-violet-800 w-10 text-3xl h-10 text-center font-extrabold' onClick={decrementItem} >-</button>
            <div className='bg-gray-200 text-black text-2xl w-10 h-10 text-center font-bold pt-1'>{item}</div>
            <button className='bg-violet-800 text-3xl w-10 h-10 text-center font-extrabold' onClick={incrementItem} >+</button>
          </div>
          <button className='py-1 px-4 bg-gradient-to-b mt-10 font-bold from-violet-800 to-purple-500'>
            Add To Cart
          </button>
          </div>
        </div>
    </div>
  )
}

export default ProductCard