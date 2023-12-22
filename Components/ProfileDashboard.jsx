'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import AuthContext from '../context/AuthContext'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { countries } from 'countries-list';
import { button } from '@nextui-org/react'

const ProfileDashboard = ({ openTab }) => {
    const [selectedCountry, setSelectedCountry] = useState('Spain')
    const countriesArray = Object.keys(countries).map((code) => ({
        code,
        name: countries[code].name,
        eu: countries[code].continent,
    }));
    const euCountries = countriesArray.filter((country) => country.eu === 'EU');
    const [edit, setEdit] = useState(false)
    const { user } = useContext(AuthContext)
    const router = useRouter()
    const [tabIndex, setTabIndex] = useState(openTab ? openTab : 0)
    const [address,setAddress] = useState({
        street:'',
        city:'',
        state:'',
        phoneNo:0,
        zipCode:0,
        country:'',
        userId:user._id
    })
    const handleTabsChange = (index) => {
        setTabIndex(index)
    }
    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout')
            if (response.status == 200)
                router.push('/login')
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async ()=>{
        try {
            setAddress({...address,country:selectedCountry})
            console.log(address)
            const response = await axios.post('/api/users/address',address)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
    const getAddress =async ()=>{
        const response= await axios.get(`/api/users/address/${user._id}`)
        setAddress({...response.data})
    }
    useEffect(()=>{
        console.log(address)
    },[address])
    useEffect(()=>{
        if(user._id)getAddress()
    },[user])
    return (
        <div className='text-white mx-4 md:mx-10 my-10 xl:mx-20 xl:my-20'>
            <Tabs variant='unstyled' className='flex gap-10 flex-wrap md:flex-nowrap' defaultIndex={tabIndex}>
                <TabList className='flex flex-col w-full md:w-60'>
                    <Tab _selected={{ border: '2px solid white', }} className='py-2 px-10 bg-slate-900 rounded mb-2'>Profile</Tab>
                    <Tab _selected={{ border: '2px solid white', }} className='py-2 px-10 bg-slate-900 rounded mb-2'>Orders</Tab>
                    <Tab _selected={{ border: '2px solid white', }} className='py-2 px-10 bg-slate-900 rounded mb-2'>Address</Tab>
                    <button className='py-2 px-10 bg-red-900 rounded mb-2' onClick={logout}>Logout</button>
                </TabList>
                <TabPanels className='bg-slate-900 p-10 rounded'>
                    <TabPanel>
                        <table className='table-custom'>
                            <tbody>
                                <tr>
                                    <td><strong>Name:</strong></td>
                                    <td className='text-md'>{user.fullname}</td>
                                </tr>
                                <tr>
                                    <td><strong>Username:</strong></td>
                                    <td className='text-md'>{user.username}</td>
                                </tr>
                                <tr>
                                    <td><strong>Email:</strong></td>
                                    <td className='text-md'>{user.email}</td>
                                    <td className='text-sm pt-1'>{user.isVerified ? (<span className='text-green-600'>Verified</span>) : (<button onClick={(e) => { verifyEmail(e, user.email) }} className='underline underline-offset-2'>verify</button>)}</td>
                                </tr>
                                <tr>
                                    <td><strong>Telegram:</strong></td>
                                    <td className='text-md'>{user.telegram}</td>
                                </tr>
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel className='order-table overflow-x-auto p-2'>
                        <div className='flex w-[660px] lg:w-full justify-evenly mb-2 bg-slate-800 rounded outline outline-1 p-2'>
                            <div className=' rounded px-2 mx-2'>
                                Sr.no
                            </div>
                            <div className=' rounded px-2 mx-2'>
                                Product Name
                            </div>
                            <div className=' rounded px-2 mx-2'>
                                Quantity
                            </div>
                            <div className=' rounded px-4 mx-2'>
                                Payment
                            </div>
                            <div className=' rounded px-4 mx-2'>
                                Shipping Status
                            </div>
                            <div className=' rounded px-4 mx-2'>
                                Order Status
                            </div>
                            <div className=' rounded px-4 mx-2'>
                                Amount
                            </div>
                        </div>
                        <div className='flex w-[660px] lg:w-full justify-evenly mb-2 bg-slate-800 rounded  p-2'>
                            <div className=' rounded px-2 mx-2'>
                                1
                            </div>
                            <div className=' rounded px-2 mx-2'>
                                Adb Butinaca
                            </div>
                            <div className=' rounded px-2 mx-2'>
                                2
                            </div>
                            <div className=' rounded px-4 mx-2'>
                                Pending
                            </div>
                            <div className=' rounded px-4 mx-2'>
                                Not Shipped
                            </div>
                            <div className=' rounded px-4 mx-2'>
                                Pending
                            </div>
                            <div className=' rounded px-4 mx-2'>
                                200
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <h3 className='text-xl font-semibold text-center'>Address</h3>
                        <form action="">
                            <div className="mb-2">
                                <label htmlFor="" className='font-semibold me-4'>Street:</label>
                                <input type="text" onChange={(e)=>{setAddress({...address,street:e.target.value})}} value={address?.street} className={edit ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-transparent'} disabled={!edit} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="" className='font-semibold me-4'>City:</label>
                                <input type="text" onChange={(e)=>{setAddress({...address,city:e.target.value})}} value={address?.city} className={edit ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-transparent'} disabled={!edit} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="" className='font-semibold me-4'>State:</label>
                                <input type="text" onChange={(e)=>{setAddress({...address,state:e.target.value})}} value={address?.state} className={edit ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-transparent'} disabled={!edit} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="" className='font-semibold me-4'>Phone Number:</label>
                                <input type="number" onChange={(e)=>{setAddress({...address,phoneNo:e.target.value})}} value={address?.phoneNo} className={edit ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-transparent'} disabled={!edit} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="" className='font-semibold me-4'>ZipCode:</label>
                                <input type="zipCode" onChange={(e)=>{setAddress({...address,zipCode:e.target.value})}} value={address?.zipCode} className={edit ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-transparent'} disabled={!edit} />
                            </div>
                            <div className="mb-2 flex">
                                <label htmlFor="" className="font-semibold mt-2 me-4">Country:</label>
                                <Listbox value={selectedCountry} onChange={setSelectedCountry} disabled={!edit}>
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
                                                {euCountries.map((country, index) => (
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
                            {
                                edit ?
                                    (<button className='py-2 px-4 btn-primary rounded' onClick={(e) => { e.preventDefault(); handleSubmit() }}>Save</button>)
                                    :
                                    (<button className='py-2 px-4 btn-primary rounded' onClick={(e) => { e.preventDefault(); setEdit(!edit) }}>Update</button>)
                            }
                            {
                                edit ? (<button className='py-2 px-4 bg-red-700 rounded ms-2' onClick={(e) => { e.preventDefault(); setEdit(!edit) }}>Discard</button>) : ''
                            }
                        </form>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}

export default ProfileDashboard