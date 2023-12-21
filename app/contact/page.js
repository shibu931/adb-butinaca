'use client'
import Link from 'next/link';
import React, { useState } from 'react'

const ContactUs = () => {
    const [isLogin, setIsLogin] = useState(true);
    const formSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div className='text-white relative xl:max-w-6xl mx-4 md:mx-auto my-10 lg:my-20 mx-10'>
            <div className='glow'></div>
            <div className='p-5 md:py-10 md:px-20 rounded bg-gray-950 bg-opacity-75 border-purple-700 border'>
                <div className='md:grid md:grid-cols-3 md:gap-10'>
                    <div className='md:px-2 md:mb-0 mb-10'>
                        <div>
                            <h3 className='text-3xl '>Contact Us</h3>
                            <small className=''>Drop your details. Our representative will reach you soon</small>
                            <form className="max-w-sm mt-5 mx-auto" onSubmit={(e) => { formSubmit(e) }}>
                                <div className="mb-5">
                                    <label for="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Dee" required />
                                </div>
                                <div className="mb-5">
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='abc@gmail.com' required />
                                </div>
                                <div className="mb-5">
                                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."></textarea>
                                </div>
                                <button type="submit" className="py-2 hover:cursor-pointer focus:outline-none focus:ring-slate-700 px-4 bg-gradient-to-b w-full font-bold from-violet-800 to-purple-500 hover:from-violet-900 hover:to-purple-600">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className='col-span-2 mx-auto'>
                        <div className='inline-flex mb-5'>
                            <h3 className='text-2xl font-light'>Email Support:</h3>
                            <Link href='mailto:helpdesk-adbbutinaca@protonmail.com' className='ms-2 text-xl font-light mt-1 underline underline-offset-2'>helpdesk-adbbutinaca@protonmail.com</Link>
                        </div>
                        <div className='inline-flex'>
                            <h3 className='text-2xl font-light'>Telegram:</h3>
                            <Link href='https://t.me/legaldarkbuzzen' className='ms-2 text-xl font-light mt-1 underline underline-offset-2'>@legaldarkbuzzen</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactUs