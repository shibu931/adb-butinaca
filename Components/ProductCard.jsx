'use client'
import Image from 'next/image'
import React, { useEffect, useState,useContext } from 'react'
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab } from '@headlessui/react'
import {
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import ProductDescription from './ProductDescription';
import ReviewCard from './ReviewCard';
import CartContext from '../context/CartContext'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const ProductCard = ({product}) => {
  const {addItemToCart} = useContext(CartContext);
  const [item, setItem] = useState(1)
  const [price, setPrice] = useState(25);
  const decrementItem = () => {
    if (item > 1) setItem(item - 1);
  }
  const incrementItem = () => {
    if (item < 1000) setItem(item + 1);
  }
  const changeItem = (e) => {
    if (e.target.value < 1000 && e.target.value > 0)
      setItem(e.target.value)
    else
    setItem(1000)
}
  const addToCartHandler = ()=>{
    addItemToCart({
      product:product._id,
      name:product.name,
      image:product.img.url,
      price:price,
      category:product.category,
      quantity:item
    })
    toast.success(
      'Product Added to cart',{
        position:'bottom-right',
        autoClose:2000,
        theme:'dark'
      }
    )
  }
  const getPriceForQuantity = (quantity) => {    
    if(product){
      const sortedPrices = product.price.slice().sort((a, b) => b.quantity - a.quantity);
      const currentPrice = sortedPrices.find(item => item.quantity <= quantity);
      if (currentPrice) {
        const price =currentPrice.price.match(/\d+/);
        setPrice(price*quantity)
      }
    }
  }
  useEffect(()=>{
    getPriceForQuantity(item)
  },[item,product])
  return (<div>
          <div className='my-10 flex flex-wrap gap-10 md:flex-nowrap min-w-'>
            <div className='md:min-w-28 mx-auto'>
              <Image
                src={product.img.url}
                alt={product.name}
                height={650}
                width={440}
                priority
              />
            </div>
            <div className='text-gray-100 flex flex-col justify-center flex-grow-0'>
              <span className='text-gray-300 text-sm md:text-lg'>{product.subCategory}</span>
              <h1 className='text-4xl md:text-6xl font-medium'><span className='bg-gradient-to-r to-purple-500 from-violet-800 text-transparent bg-clip-text'>{product.name}</span></h1>
              {/* &#x20AC; */}
              <p className='text-md mb-5'>{product.summary}</p>
              <table class="min-w-full text-left text-sm font-light md:block hidden">
                <tbody className=''>
                  <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 border-neutral-500 dark:hover:bg-neutral-600">
                    <td className="whitespace-nowrap px-4 py-4 font-medium   border border-neutral-500">Quantity:</td>
                    {
                      product?.price.map((item, index) => (
                        <td className="whitespace-nowrap px-4 py-4 border border-neutral-500" key={index}>{item.quantity}</td>
                      ))
                    }
                  </tr>
                  <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 border-neutral-500 dark:hover:bg-neutral-600 "
                  >
                    <td className="whitespace-nowrap px-4 py-4 font-medium   border border-neutral-500">Price:</td>
                    {
                      product?.price.map((item, index) => (
                        <td className="whitespace-nowrap px-4 py-4 border border-neutral-500" key={index}>{item.price}</td>
                      ))
                    }
                  </tr>
                </tbody>
              </table>
              <table class="min-w-full text-left text-sm font-light  border border-neutral-500 md:hidden">
                <thead>
                  <tr>
                    <td className="whitespace-nowrap px-4 py-4 border border-neutral-500"><strong>Quantity</strong></td>
                    <td className="whitespace-nowrap px-4 py-4 border border-neutral-500"><strong>Price</strong></td>
                  </tr>
                </thead>
                <tbody className=''>
                  {
                    product?.price.map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-2 border border-neutral-500" >{item.quantity}</td>
                        <td className="whitespace-nowrap px-6 py-2 border border-neutral-500" >{item.price}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div className="mt-5">
                <h3 className='text-xl font-light'>Total Amount: <span className='text-purple-600 font-bold'>€{price}</span></h3>
              </div>
              <div className="flex gap-5 flex-grow-0 mt-5">
                <div className='flex'>
                  <button className='bg-violet-800 w-10 text-3xl h-10 text-center pb-1 font-extrabold' onClick={decrementItem} >-</button>
                  <input type="number" className='bg-gray-200 text-black text-2xl w-16 h-10 text-center font-bold pt-1' value={item} onChange={(e) => { changeItem(e) }} />
                  <button className='bg-violet-800 text-3xl w-10 h-10 text-center pb-1 font-extrabold' onClick={incrementItem} >+</button>
                </div>
                <button onClick={addToCartHandler} className='py-1 px-4 bg-gradient-to-b font-bold from-violet-800 to-purple-500 hover:from-violet-900 hover:to-purple-600'>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className='text-white '>
            <Tab.Group >
              <Tab.List className='w-full max-w-md px-2 sm:px-0 mx-auto mb-5 flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
                <Tab className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-1 ring-offset-blue-900 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }>Description</Tab>
                <Tab className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg px-2 py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-1 ring-offset-blue-900 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }>Additional Information</Tab>
                <Tab className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-1 ring-offset-blue-900 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }>Reviews</Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel><ProductDescription description={product.description} /></Tab.Panel>
                <Tab.Panel>
                  <div className='bg-slate-900 p-5 md:py-10 md:px-20 rounded border-gray-800 border-2'>
                    <TableContainer>
                      <Table variant='simple'>
                        <Tbody>
                          <Tr className='align-top'>
                            <Td ><strong>Shipping: </strong></Td>
                            <Td>We ship to all over europe</Td>
                          </Tr>
                          <Tr>
                            <Td><strong>Storage: </strong></Td>
                            <Td>-20°C</Td>
                          </Tr>
                          <Tr>
                            <Td><strong>Stability: </strong></Td>
                            <Td>≥ 5 years</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <ReviewCard id={product._id}/>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
  )
}

export default ProductCard