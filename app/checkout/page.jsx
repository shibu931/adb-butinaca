'use client'
import React, { useContext, useEffect, useState } from 'react'
import { Listbox, Transition, Dialog } from '@headlessui/react'
import { Fragment } from 'react'
import CartContext from '../../context/CartContext'
import { countries } from 'countries-list';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import AuthContext from '/context/AuthContext'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Checkout = () => {
  const router = useRouter();
  const { user, address, postAddress, setAddress, getAddress,error } = useContext(AuthContext)
  const [selectedCountry, setSelectedCountry] = useState()
  const { cart,setCart } = useContext(CartContext)
  let [isOpen, setIsOpen] = useState(false)
  const [isLoading,setIsLoading] = useState(false);
  function closeModal() {
    setIsOpen(false)
    router.push('profile/1')
  }
  const totalCartAmount = cart?.cartItems?.reduce((acc, item) => acc + item.price, 0)
  const countriesArray = Object.keys(countries).map((code) => ({
    code,
    name: countries[code].name,
    eu: countries[code].continent,
  }));
  const placeOrder = async ()=>{
    setIsLoading(true)
    postAddress()
    const response = await axios.post('/api/order',cart)
    if(response.status == 201){
      setCart([])
      setIsOpen(true)
      setIsLoading(false)
    }
    setIsLoading(false)
  }
  useEffect(() => {
    const fetchIPInfo = async () => {
      try {
        if (!address) {
          const response = await fetch(`https://ipinfo.io/json?token=${process.env.IP_INFO_TOKEN}`);
          const data = await response.json();
          const c = countriesArray.filter((country) => country.code === data.country)
          setSelectedCountry(c[0].name)
          setAddress({ ...address, city: data.city, state: data.region })
          if(!address?.country) setAddress({...address,country:selectedCountry})
        }
          setSelectedCountry(address.country)
      } catch (error) {
        console.error('Error fetching IP information:', error);
      }
    };
    getAddress()
    fetchIPInfo();
  }, []);
  useEffect(()=>{
    setSelectedCountry(address.country)
  },[address])
  return (
    <div className='xl:mx-20 md:mx-10 mx-2 flex md:flex-no-wrap flex-wrap my-20 text-white'>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Order Placed Successfull
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-500 font-normal">
                    Thank you for your purchase, soon our customer service will contact you and we will give you our payment information.
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className='xl:w-[800px] md:w-[600px] w-full '>
        <div className='bg-slate-900 rounded p-2 md:me-5 md:p-5 xl:p-10'>
          <h2 className='text-2xl font-bold ps-5 mb-5 text-center'>Shipping Address</h2>
          <form action="">
            <div className="mb-2">
              <label htmlFor="" className='font-semibold me-4'>Street:</label>
              <input type="text" onChange={(e) => { setAddress({ ...address, street: e.target.value }) }} value={address?.street} className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'} />
            </div>
            <div className="mb-2">
              <label htmlFor="" className='font-semibold me-4'>City:</label>
              <input type="text" onChange={(e) => { setAddress({ ...address, city: e.target.value }) }} value={address?.city} className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'} />
            </div>
            <div className="mb-2">
              <label htmlFor="" className='font-semibold me-4'>Provision:</label>
              <input type="text" onChange={(e) => { setAddress({ ...address, state: e.target.value }) }} value={address?.state} className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'} />
            </div>
            <div className="mb-2">
              <label htmlFor="" className='font-semibold me-4'>Phone Number:</label>
              <input type="number" onChange={(e) => { setAddress({ ...address, phoneNo: e.target.value }) }} value={address?.phoneNo} className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'} />
            </div>
            <div className="mb-2">
              <label htmlFor="" className='font-semibold me-4'>ZipCode:</label>
              <input type="zipCode" onChange={(e) => { setAddress({ ...address, zipCode: e.target.value }) }} value={address?.zipCode} className={'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'} />
            </div>
            <div className="mb-2 flex">
              <label htmlFor="" className="font-semibold mt-2 me-4">Country:</label>
              <Listbox value={selectedCountry} onChange={setSelectedCountry}>
                <div className="relative mt-1 w-[240px]">
                  <Listbox.Button className="relative w-full cursor-default rounded-lg bg-slate-800 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                    <span className="block truncate">{selectedCountry}</span>
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
                      {countriesArray.map((country, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-slate-700 text-slate-200' : 'text-white'
                            }`
                          }
                          value={country.name}
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                  }`}
                              >
                                {country.name}
                              </span>
                              {selectedCountry ? (
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
          </form>
        </div>
      </div>
      <div className='xl:w-[400px] md:w-[300px] bg-slate-900 flex justify-between flex-col lg:py-10 lg:px-4 p-3 rounded w-full'>
        <div>
          <h2 className='text-3xl font-bold text-center'>Checkout</h2>
          <hr className='mt-2 mb-5' />

          {cart?.cartItems?.map((product, index) => (
            <div className='flex mb-4 justify-between px-2' key={index}>
              <div>
                <h3 className='text-lg'>{product.name}</h3>
                <span className='text-sm'>Quantity: {product.quantity}gm</span>
              </div>
              <h3 className='text-xl'>€{product.price}</h3>
            </div>
          ))}
        </div>
        <div>
          <div className="flex justify-between mt-2 mb-2 items-center">
            <p className='font-bold'>Shipping Charges:</p>
            <p className='font-extrabold'>&#x20AC;{totalCartAmount > 200 ? 0 : 20}</p>
          </div>
          <hr />
          <div className="flex justify-between mt-2 items-center">
            <p className='font-bold'>Total Amount:</p>
            <p className='font-extrabold'>&#x20AC;{totalCartAmount > 200 ? totalCartAmount : totalCartAmount + 20}</p>
          </div>
          <hr className='mt-3' />
          {
            address.street && address.city && address.phoneNo && address.state && address.zipCode && cart?.cartItems?.length > 0  ? (<button className='py-2 px-4 rounded inline-block w-full mt-5 text-center btn-primary' onClick={(e)=>{e.preventDefault(); placeOrder()}}>{isLoading ? 'Processing...':'Place Order'}</button>)
            :(<button className='py-2 px-4 rounded inline-block w-full mt-5 text-center bg-gray-700' disabled>Place Order</button>)
          }
        </div>
      </div>
    </div>
  )
}

export default Checkout