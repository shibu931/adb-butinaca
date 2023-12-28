'use client'
import React, { useContext, useEffect, useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import AuthContext from '../context/AuthContext';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { countries } from 'countries-list';
import axios from 'axios';

const ProfileDashboard = ({ openTab }) => {
    const [selectedCountry, setSelectedCountry] = useState();
    const { user, logout, address, setAddress, edit, getAddress, setEdit, postAddress } = useContext(AuthContext);
    const [tabIndex, setTabIndex] = useState(openTab || 0);

    const [orders, setOrders] = useState();
    const countriesArray = Object.keys(countries).map((code) => ({
        code,
        name: countries[code].name,
        eu: countries[code].continent,
    }));

    const fetchData = async () => {
        try {
            if (!address.userId) {
                const response = await fetch(`https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IP_INFO_TOKEN}`);
                const data = await response.json();
                const c = countriesArray.find((country) => country.code === data.country);
                setSelectedCountry(c.name);
                setAddress({ ...address, city: data.city, state: data.region });
            }
        } catch (error) {
            console.error('Error fetching IP information:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const RenderCountryOptions = () => {
        return countriesArray.map((country, index) => (
            <Listbox.Option
                key={index}
                className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-slate-700 text-slate-200' : 'text-white'}`
                }
                value={country.name}
            >
                {({ selected }) => (
                    <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{country.name}</span>
                        {selectedCountry && (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                        )}
                    </>
                )}
            </Listbox.Option>
        ));
    };

    const getOrders = async () => {
        try {
            if(user._id){
                const response = await axios.get(`/api/order/${user._id}`);
                setOrders(response.data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    useEffect(() => {
        setSelectedCountry(address?.country);
    }, [address]);

    useEffect(()=>{
        getOrders();
    },[user])

    return (
        <div className="text-white mx-4 md:mx-10 my-10 xl:mx-20 xl:my-20">
            <Tabs variant="unstyled" className="flex gap-10 flex-wrap md:flex-nowrap" defaultIndex={tabIndex}>
                <TabList className="flex flex-col w-full md:w-60">
                    <Tab _selected={{ border: '2px solid white' }} className="py-2 px-10 bg-slate-900 rounded mb-2">
                        Profile
                    </Tab>
                    <Tab _selected={{ border: '2px solid white' }} className="py-2 px-10 bg-slate-900 rounded mb-2">
                        Orders
                    </Tab>
                    <Tab _selected={{ border: '2px solid white' }} className="py-2 px-10 bg-slate-900 rounded mb-2">
                        Address
                    </Tab>
                    <button className="py-2 px-10 bg-red-900 rounded mb-2" onClick={() => logout()}>
                        Logout
                    </button>
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
                                    {/* <td className='text-sm pt-1'>{user.isVerified ? (<span className='text-green-600'>Verified</span>) : (<button onClick={(e) => { verifyEmail(e, user.email) }} className='underline underline-offset-2'>verify</button>)}</td> */}
                                </tr>
                                <tr>
                                    <td><strong>Telegram:</strong></td>
                                    <td className='text-md'>{user.telegram}</td>
                                </tr>
                            </tbody>
                        </table>
                    </TabPanel>
                    <TabPanel className='order-table overflow-x-auto p-2'>
                        {
                            orders ?
                                (<table className='table-custom'>
                                    <thead className='mb-2 bg-slate-800 rounded outline-gray-600 outline outline-1 p-2'>
                                        <tr>
                                            <td>Sr.no</td>
                                            <td>Product</td>
                                            <td>Quantity</td>
                                            <td>Payment</td>
                                            <td>Shipping Status</td>
                                            <td>Order Status</td>
                                            <td>Amount</td>
                                        </tr>
                                    </thead>
                                    <tbody className='mt-2'>
                                        {orders.map((order, index) => (
                                            <tr className='bg-slate-800 rounded p-2 border-gray-600 border-b-2 mb-2'>
                                                <td className='border-e-2 border-gray-600 border-s-2'>{index + 1}</td>
                                                <td className='border-e-2 border-gray-600'>
                                                    {order.products.map((product, index) => (
                                                        <p key={index}>{product.name}</p>
                                                    ))}
                                                </td>
                                                <td className='border-e-2 border-gray-600'>
                                                    {order.products.map((product, index) => (
                                                        <p key={index}>{product.quantity}</p>
                                                    ))}
                                                </td>
                                                <td className='border-e-2 border-gray-600'>{order.paymentStatus}</td>
                                                <td className='border-e-2 border-gray-600'>{order.shippingStatus}</td>
                                                <td className='border-e-2 border-gray-600'>{order.orderStatus}</td>
                                                <td className='border-e-2 border-gray-600'>{order.totalAmount}</td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table>)
                                :
                                (<h3 className='text-2xl font-semibold text-center mt-5'>There are no orders</h3>)
                        }
                    </TabPanel>
                    <TabPanel>
                        <h3 className='text-xl font-semibold text-center'>Address</h3>
                        <form action="">
                            <div className="mb-2">
                                <label htmlFor="" className='font-semibold me-4'>Street:</label>
                                <input type="text" onChange={(e) => { setAddress({ ...address, street: e.target.value }) }} value={address?.street} className={edit ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-transparent'} disabled={!edit} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="" className='font-semibold me-4'>City:</label>
                                <input type="text" onChange={(e) => { setAddress({ ...address, city: e.target.value }) }} value={address?.city} className={edit ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-transparent'} disabled={!edit} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="" className='font-semibold me-4'>Provision:</label>
                                <input type="text" onChange={(e) => { setAddress({ ...address, state: e.target.value }) }} value={address?.state} className={edit ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-transparent'} disabled={!edit} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="" className='font-semibold me-4'>Phone Number:</label>
                                <input type="number" onChange={(e) => { setAddress({ ...address, phoneNo: e.target.value }) }} value={address?.phoneNo} className={edit ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-transparent'} disabled={!edit} />
                            </div>
                            <div className="mb-2">
                                <label htmlFor="" className='font-semibold me-4'>ZipCode:</label>
                                <input type="zipCode" onChange={(e) => { setAddress({ ...address, zipCode: e.target.value }) }} value={address?.zipCode} className={edit ? 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' : 'bg-transparent'} disabled={!edit} />
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
                                                <RenderCountryOptions/>
                                                {/* {countriesArray.map((country, index) => (
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
                                                ))} */}
                                            </Listbox.Options>
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                            {
                                edit ?
                                    (<button className='py-2 px-4 btn-primary rounded' onClick={(e) => { e.preventDefault(); postAddress(selectedCountry) }}>Save</button>)
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
    );
};

export default ProfileDashboard;
