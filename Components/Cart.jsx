'use client'
import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useContext, useEffect, useState } from 'react'
import CartContext from '../context/CartContext'
import { XMarkIcon } from "@heroicons/react/24/solid";

export default function Cart() {
  const { addItemToCart, cart,deleteItemFromCart } = useContext(CartContext);
  const [shippingCharges, setShippingCharges] = useState(true);
  const totalCartAmount = cart?.cartItems?.reduce((acc,item)=> acc + item.price,0)

  return (
    <Popover className="relative">
      <Popover.Button className='outline-none'>
        <Image
          src='/assets/img/cart-icon.png'
          alt='User'
          width={40}
          height={40}
        />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute right-0 z-10 mt-3 w-screen max-w-sm transform px-4 sm:px-0 lg:max-w-sm">
          <div className="overflow-hidden rounded-lg bg-gradient-to-br from-violet-800 to-purple-600 shadow-2xl ring-1 ring-black/5">
            {
              cart?.cartItems?.length > 0 ? (
                <div className="relative grid gap-8 p-7 text-slate-200">
                  <ul className=''>
                    {
                      cart?.cartItems?.map((cartItem) => (
                        <li className='flex mb-4'>
                          <Image
                            src={cartItem.image}
                            alt={cartItem.name}
                            width={50}
                            height={50}
                            className='rounded-sm flex-grow-0 w-[50px] h-[50px] object-cover'
                          />
                          <div className='ms-4'>
                            <h2 className='font-bold'>{cartItem.name}<span className='text-sm'>(x{cartItem.quantity})</span></h2>
                            <p className='text-sm font-bold'>{cartItem.price}&#x20AC;</p>
                          </div>
                          <div className="ms-auto">
                          <XMarkIcon className="h-6 w-6 mt-2 p-1 font-extrabold text-purple-800 bg-white rounded-full  ms-auto hover:cursor-pointer" onClick={()=>{deleteItemFromCart(cartItem.product)}} />
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                  <div>
                  <div className="flex justify-between mt-2 mb-2 items-center">
                    <p className='font-bold'>Shipping Charges:</p>
                    <p className='font-extrabold'>{totalCartAmount > 200 ? 0 : 20}&#x20AC;</p>
                    </div>
                    <hr className=''/>
                    <div className="flex justify-between mt-2 items-center">
                    <p className='font-bold'>Total Amount:</p>
                    <p className='font-extrabold'>{totalCartAmount > 200 ? totalCartAmount : totalCartAmount+20}&#x20AC;</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='relative grid gap-8 p-7 text-slate-200'>
                  <h2 className='text-xl font-semibold text-center'>No items in cart</h2>
                </div>
              )
            }
            <Link href=""><p className='text-center bg-purple-400 py-4 font-extrabold text-violet-900'>Checkout</p></Link>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
