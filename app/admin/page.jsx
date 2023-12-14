'use client'
import TextEditor from '@/Components/TextEditor'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

const product = {
  title: 'ADB Butinaca',
  img: 'https://placehold.co/50x50',
  category: 'Reaserch Chemicals'
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className='max-w-10xl mx-auto text-white my-10 mx-10'>
      <div className="grid lg:grid-cols-8 lg:gap-20">
        <div className="col-span-2 h-auto">
          <ul className=''>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab == 1 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(1)}>Product's</button></li>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab == 2 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(2)}>SEO</button></li>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab == 3 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(3)}>Article Page</button></li>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab == 4 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(4)}>User</button></li>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab == 5 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(5)}>Orders</button></li>
          </ul>
        </div>
        <div className="col-span-6">
          <div className='bg-slate-900 py-10 w-full rounded px-10'>
            <Link className='px-4 py-2 btn-primary rounded font-semibold' href={'/'}>Add Product</Link>
            {/* <ul className='mt-5'>
              <li>
                <ProductList product={product}/>
              </li>
            </ul> */}
            <ProductForm />
          </div>
        </div>
      </div>
      {/* <TextEditor/> */}
    </div>
  )
}

export const ProductList = ({ product }) => {
  return (
    <div className='flex p-4 bg-slate-800 rounded'>
      <Image
        className='rounded '
        src={product.img}
        width={50}
        height={50}
      />
      <div className='ms-5'>
        <h2 className='text-xl'>{product.title}</h2>
        <span className='text-xs'>{product.category}</span>
      </div>
      <div className='ms-auto my-auto'>
        <Link href={'/'} className='mx-2 bg-green-700 px-4 rounded py-2'>
          Edit
        </Link>
        <Link href={'/'} className='mx-2 bg-red-700 px-4 rounded py-2'>
          Delete
        </Link>
      </div>
    </div>
  )
}

export const ProductForm = ({ product }) => {
  return (
    <div className='border-2 rounded mt-10 border-slate-800 p-10'>
      <form action="">
        <div className="mb-5">
          <label for="productTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Title</label>
          <input type="text" id="productTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Title" required />
        </div>
        <div className="mb-5">
          <label for="productSlug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Slug</label>
          <input type="text" id="productSlug" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Slug" required />
        </div>
        <div className="mb-5">
          <label for="productSummary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Summary</label>
          <textarea id="productSummary" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Summary"></textarea>
        </div>
        <div className="mb-5">
          <label for="productSummary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
          <div className='text-black'>
          <TextEditor/>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Admin