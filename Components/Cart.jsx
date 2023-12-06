import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'


export default function Cart() {
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
                <div className="overflow-hidden rounded-lg shadow-black bg-gradient-to-br from-violet-800 to-purple-600 shadow-xl ring-1 ring-black/5">
                  <div className="relative grid gap-8 p-7 text-slate-200">
                    <ul className=''>
                    <li className='flex mb-4'>
                            <Image
                                src='https://placehold.co/50x50'
                                alt="Product Image"
                                width={50}
                                height={50}
                                className='rounded-sm flex-grow-0 object-contain'
                            />
                            <div className='ms-4'>
                                <h2 className='font-bold'>Product Name <span className='text-sm'>(x2)</span></h2>
                                <p className='text-sm font-bold'>&#x20AC; 22.12</p>
                            </div>
                        </li>
                        <li className='flex mb-4'>
                            <Image
                                src='https://placehold.co/50x50'
                                alt="Product Image"
                                width={50}
                                height={50}
                                className='rounded-sm flex-grow-0 object-contain'
                            />
                            <div className='ms-4'>
                                <h2 className='font-bold'>Product Name <span className='text-sm'>(x2)</span></h2>
                                <p className='text-sm font-bold'>&#x20AC; 22.12</p>
                            </div>
                        </li>
                        <li className='flex'>
                            <Image
                                src='https://placehold.co/50x50'
                                alt="Product Image"
                                width={50}
                                height={50}
                                className='rounded-sm flex-grow-0 object-contain'
                            />
                            <div className='ms-4'>
                                <h2 className='font-bold'>Product Name <span className='text-sm'>(x2)</span></h2>
                                <p className='text-sm font-bold'>&#x20AC; 22.12</p>
                            </div>
                        </li>
                    </ul>
                    <div>
                        <hr />
                        <p className='font-bold mt-2 '><span className='font-extrabold'>Total: </span>120.22</p>
                    </div>
                  </div>
                  <Link href=""><p className='text-center bg-purple-400 py-4 font-extrabold text-violet-900'>Checkout</p></Link>
                </div>
              </Popover.Panel>
            </Transition>
  </Popover>
    )
}
