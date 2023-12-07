'use client'
import Link from 'next/link';
import React, { useState } from 'react'

const ReviewCard = () => {
    const [isLogin,setIsLogin] = useState(false);

    return (
    <div className='bg-slate-900 p-5 md:py-10 md:px-20 rounded border-gray-800 border-2'>
        {
            isLogin ? (
                <div>
                </div>
            ):(
                <div className=''>
                    <h3 className='text-xl'>You need to login first to post reviews!</h3>
                    <div className='flex mt-4'>
                        <Link href="/login" className='py-2 px-4 bg-gradient-to-b font-bold from-violet-800 to-purple-500 rounded-sm mx-2'>  
                            Login
                        </Link>
                        <Link href="/signup" className='py-2 px-4 bg-gradient-to-b font-bold from-violet-800 to-purple-500 rounded-sm mx-2'>
                            Sign Up
                        </Link>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default ReviewCard