'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useRef } from 'react'
import JoditEditor from 'jodit-react';
import { useEdgeStore } from '/lib/edgestore';
import { SingleImageDropzone } from '/Components/single-dropzone-file';
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Axis3D } from 'lucide-react';
import axios from 'axios';

const product = {
  title: 'ADB Butinaca',
  img: 'https://placehold.co/50x50',
  category: 'Reaserch Chemicals'
}

const Admin = () => {
  const [openTab, setOpenTab] = useState();
  const [activeTab, setActiveTab] = useState(1);
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div className='max-w-10xl text-white my-10 mx-10'>
      <div className="grid lg:grid-cols-8 lg:gap-20">
        <div className="col-span-2 h-auto">
          <ul className=''>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 1 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(1)}>Product's</button></li>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 2 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(2)}>Product Category</button></li>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 3 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(3)}>Product Sub Category</button></li>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 4 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(4)}>SEO</button></li>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 5 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(5)}>Article Page</button></li>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 6 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(6)}>User</button></li>
            <li><button className={`py-2 px-4 mb-2 bg-slate-800 rounded w-full ${activeTab === 7 ? 'border-gray-200 border-2' : ''}`} onClick={() => handleTabClick(7)}>Orders</button></li>
          </ul>
        </div>
        <div className="col-span-6">
          <div className='bg-slate-900 py-10 w-full rounded px-10'>
            <button className='px-4 py-2 btn-primary rounded font-semibold' onClick={(e) => { e.preventDefault(); setOpenTab('/add-product') }}>Add Product</button>
            <button className='px-4 py-2 btn-primary rounded font-semibold ms-2' onClick={(e) => { e.preventDefault(); setOpenTab('') }}>View Product</button>
            {
              openTab === '' ?
                <ul className='mt-5'>
                  <li>
                    <ProductList product={product} />
                  </li>
                </ul> :
                openTab === '/add-product' ?
                  <ProductForm />
                  : ''
            }
          </div>
        </div>
      </div>
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

export const ProductForm = ({ productDetails }) => {
  const productCategory = [
    { name: 'Research Chemicals' },
  ]
  const productSubCategory = [
    { name: 'Cannabinoids' },
  ]
  const [selectedCategory, setSelectedCategory] = useState(productCategory[0])
  const [selectedSubCategory, setSelectedSubCategory] = useState(productSubCategory[0])
  const [progress, setProgress] = useState(0)
  const [file, setFile] = useState();
  const { edgestore } = useEdgeStore();
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [product, setProduct] = useState({
    name: '',
    slug: '',
    summary: '',
    description: '',
    price: [
    ],
    img: {
      thumb:'',
      url:''
    },
    category: '',
    subCategory: ''
  })

  const handlePriceButton = (event) => {
    event.preventDefault();
    let price = document.querySelector('.price-field')
    let priceKey = document.querySelector('.price-key')
    let temp = {
      quantity: priceKey.value,
      price: price.value
    }
    let updatedProduct = { ...product }
    const index = updatedProduct.price.findIndex((price) => price.quantity == priceKey.value);

    if (index !== -1) {
      console.log(index)
      updatedProduct.price[index].price = price.value;
    } else {
      console.log(index)
      updatedProduct.price.push(temp);
    }
    updatedProduct.price.sort();
    setProduct(updatedProduct);
    priceKey.value = 0,
    price.value = ''
  }
  const editPrice = (event, item) => {
    event.preventDefault();
    let price = document.querySelector('.price-field')
    let priceKey = document.querySelector('.price-key')
    price.value = item.price
    priceKey.value = item.quantity
  }
  const deletePrice = (event, item) => {
    event.preventDefault();
    let updatedProduct = { ...product }
    const updatedPrices = updatedProduct.price.filter((price) => price.quantity !== item.quantity)
    updatedProduct.price = updatedPrices
    setProduct(updatedProduct)
  }


  const submitForm = (e) => {
    e.preventDefault()
    const data = { ...product }
    data.category = selectedCategory.name
    data.subCategory = selectedSubCategory.name
    data.description = content
    axios.post('http://localhost:3000/api/products', data)
      .then(response => {
        console.log('Response:', response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  return (
    <div className='border-2 rounded mt-10 border-slate-800 p-10'>
      <form action="">
        <div className="mb-5">
          <label for="productTitle" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Title</label>
          <input type="text" id="productTitle" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Title" required
            onChange={(e) => {
              setProduct({ ...product, name: e.target.value })
            }}
          />
        </div>
        <div className="mb-5">
          <label for="productSlug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Slug</label>
          <input type="text" id="productSlug" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Product Slug" required
            onChange={(e) => {
              setProduct({ ...product, slug: e.target.value })
            }}
          />
        </div>
        <div className="mb-5">
          <label for="productSummary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Summary</label>
          <textarea id="productSummary" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product Summary"
            onChange={(e) => {
              setProduct({ ...product, summary: e.target.value })
            }}
          ></textarea>
        </div>
        <div className="mb-5">
          <label for="productSummary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
          <div className='text-black'>
            <JoditEditor
              ref={editor}
              value={content}
              tabIndex={1}
              onBlur={newContent => setContent(newContent)}
              onChange={newContent => { }}
            />
          </div>
        </div>
        <div className="mb-5 flex flex-grow-0">
          <div className='w-full pe-5'>
            <label for="productSummary" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Price</label>
            <input type="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-12 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 price-key" required />
            <input type="text" id="productSlug" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 ms-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 price-field" placeholder="Enter Product Price" required
            />
          </div>
          <button className='px-4 py-2 mt-7 ms-auto bg-green-700 rounded' onClick={(event) => handlePriceButton(event)}>Add</button>
        </div>
        <div className='mb-5 bg-slate-800 rounded p-2'>
          {
            product.price?.map((item, index) => (
              <div key={index} className='rounded mb-2 p-2 flex bg-slate-900'>
                <p >{item.quantity}. {item.price}</p>
                <div className='ms-auto'>
                  <button className='py-1 px-4 rounded bg-green-700' onClick={(event) => editPrice(event, item)}>Edit</button>
                  <button className='ms-2 py-1 px-4 rounded bg-red-700' onClick={(event) => deletePrice(event, item)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
        <div className="mb-5 flex">
          <div>
            <SingleImageDropzone
              width={200}
              height={200}
              value={file}
              onChange={(file) => {
                setFile(file);
              }}
            />
            <div className='h-[6px] w-44 border rounded overflow-hidden'>
              <div className="h-full bg-white transition-all duration-150" style={{ width: `${progress}%` }}></div>
            </div>
            <button className='py-2 mt-2 px-4 bg-green-700 rounded hover:bg-green-900' onClick={async (event) => {
              event.preventDefault();
              if (file) {
                const res = await edgestore.publicFiles.upload({
                  file,
                  onProgressChange: (progress) => {
                    setProgress(progress)
                  }
                })
                
                setProduct({ ...product, img: {thumb:res.thumbnailUrl,url:res.url} })
              }
            }}>Upload</button>
          </div>
          <div className='mx-auto'>
            <div className="w-72 mb-5">
              <label >Select Product Category</label>
              <Listbox value={selectedCategory} onChange={setSelectedCategory}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selectedCategory.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {productCategory.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-slate-700 text-slate-200' : 'text-white'
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                  }`}
                              >
                                {person.name}
                              </span>
                              {selectedCategory ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="w-72">
              <label >Select Product Sub Category</label>
              <Listbox value={selectedSubCategory} onChange={setSelectedSubCategory}>
                <div className="relative z-10 mt-1">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selectedSubCategory.name}</span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {productSubCategory.map((person, personIdx) => (
                        <Listbox.Option
                          key={personIdx}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-slate-700 text-slate-200' : 'text-white'
                            }`
                          }
                          value={person}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selectedSubCategory ? 'font-medium' : 'font-normal'
                                  }`}
                              >
                                {person.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
          </div>
        </div>
        <button className='w-full btn-primary py-2' onClick={(e) => submitForm(e)}>Upload Product</button>
      </form>
    </div>
  )
}

export default Admin