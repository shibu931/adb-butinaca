'use client'
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'

const productReviews = {
    productTitle: 'Adb-butinaca',
    totalReviews: 12,
    reviews: [
        {
            id: 1,
            customerName: 'Tim Blake',
            noOfStars: 4,
            review: 'Product is very good',
            reviewTime: '19-12-2023'
        },
        {
            id: 2,
            customerName: 'Alice Johnson',
            noOfStars: 5,
            review: 'Excellent product!',
            reviewTime: '20-12-2023'
        },
        {
            id: 3,
            customerName: 'Bob Smith',
            noOfStars: 3,
            review: 'Decent product, but could be better',
            reviewTime: '21-12-2023'
        },
        {
            id: 4,
            customerName: 'Emily Davis',
            noOfStars: 4,
            review: 'Satisfied with the purchase',
            reviewTime: '22-12-2023'
        }

    ]
}

const colors = {
    orange: "#F2C265",
    grey: "a9a9a9"
}
const stars = Array(5).fill(0)

const ReviewCard = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [rating, setRating] = useState(0)
    const [hoverValue, setHoverValue] = useState(undefined)

    const handleMouseOverStar = value => {
        setHoverValue(value)
    };

    const handleMouseLeaveStar = () => {
        setHoverValue(undefined)
    }

    const handleClickStar = value => {
        setRating(value)
    };

    return (
        <div className='bg-slate-900 p-5 md:py-10 md:px-20 rounded border-gray-800 border-2'>
            <div className='md:grid md:grid-cols-3 md:gap-10'>
                <div className='md:px-2 md:mb-0 mb-10'>
                    {
                        isLogin ? (
                            <div>
                                <h3 className='text-3xl mb-5'>Post a review</h3>
                                <form className="max-w-sm mx-auto">
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
                                    <div className="flex mb-5">
                                    {stars.map((_, index) => {
                                        return (
                                            <StarIcon
                                                key={index}
                                                value={rating}
                                                className={`h-6 w-6 ${(hoverValue || rating) > index ? 'text-yellow-500':'text-slate-200'}`}
                                                onChange={(e) => setRating(e.target.value)}
                                                // color={(hoverValue || rating) > index ? colors.orange : colors.grey}
                                                onClick={() => handleClickStar(index + 1)}
                                                onMouseOver={() => handleMouseOverStar(index + 1)}
                                                onMouseLeave={() => handleMouseLeaveStar}
                                            />
                                        )
                                    })}
                                    </div>
                                    <button type="submit" className="py-2 hover:cursor-pointer focus:outline-none focus:ring-slate-700 px-4 bg-gradient-to-b w-full font-bold from-violet-800 to-purple-500 hover:from-violet-900 hover:to-purple-600">Submit</button>
                                </form>
                            </div>
                        ) : (
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
                <div className='col-span-2'>
                    <h2 className='text-3xl font-semibold mb-4'>{productReviews.totalReviews} reviews of {productReviews.productTitle}</h2>
                    {
                        productReviews.reviews?.map((review, index) => (
                            <UserReviewCard review={review} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export const UserReviewCard = ({ review }) => {
    return (
        <div className='p-4 mb-4 border-2 border-slate-700 rounded-md hover:scale-105 transition-all hover:cursor-pointer'>
            <div className="flex flex-nowrap">
                <div>
                    <Image
                        src="https://placehold.co/60x60"
                        alt="user profile"
                        className='rounded-md'
                        width={60}
                        height={60}
                    />
                </div>
                <div className='ms-2 md:ms-5 flex flex-wrap sm:flex-nowrap justify-between w-full'>
                    <div>
                        <h3 className='text-xl'>{review.customerName}</h3>
                        <p className='text-slate-300'>{review.review}</p>
                    </div>
                    <div>
                        <div className="flex md:mb-2 md:justify-end">
                            {
                                [...Array(review.noOfStars)].map((star, index) => (
                                    <StarIcon key={index} className="h-6 w-6 text-yellow-500" />
                                ))
                            }
                        </div>
                        <span className='text-slate-400'>Review Date: {review.reviewTime}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReviewCard