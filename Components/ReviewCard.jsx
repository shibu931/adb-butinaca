'use client'
import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '/context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const productReviews = {
//     productTitle: 'Adb-butinaca',
//     totalReviews: 12,
//     reviews: [
//         {
//             id: 1,
//             customerName: 'Tim Blake',
//             noOfStars: 4,
//             review: 'Product is very good',
//             reviewTime: '19-12-2023'
//         },
//         {
//             id: 2,
//             customerName: 'Alice Johnson',
//             noOfStars: 5,
//             review: 'Excellent product!',
//             reviewTime: '20-12-2023'
//         },
//         {
//             id: 3,
//             customerName: 'Bob Smith',
//             noOfStars: 3,
//             review: 'Decent product, but could be better',
//             reviewTime: '21-12-2023'
//         },
//         {
//             id: 4,
//             customerName: 'Emily Davis',
//             noOfStars: 4,
//             review: 'Satisfied with the purchase',
//             reviewTime: '22-12-2023'
//         }

//     ]
// }

const totalStars = Array(5).fill(0)

const ReviewCard = ({id}) => {
    const {isAuthenticated,user} = useContext(AuthContext)
    const [stars, setRating] = useState(0)
    const [productReviews,setProductReviews] = useState({
        rating:0,
        reviews:[]
    })
    const [loading, setLoading] = useState(false)
    const [hoverValue, setHoverValue] = useState(undefined)
    const [review,setReview] = useState({
        customerName:user.fullname,
        customerEmail:user.email,
        comments:'',
        rating:0
    })
    const handleMouseOverStar = value => {
        setHoverValue(value)
    };

    const handleMouseLeaveStar = () => {
        setHoverValue(undefined)
    }

    const handleClickStar = value => {
        setRating(value)
    };
    const submitForm = async (e)=>{
        e.preventDefault()
        try {
            setLoading(true)
            setReview({...review,rating:stars})
            const response = await axios.post(`/api/products/review/${id}`,review)
            if(response.status==201){
                toast.success(
                    'Review Posted Successful',{
                      position:'bottom-center',
                      autoClose:2000,
                      theme:'dark'
                    }
                )
                setLoading(false)
            }
        } catch (error) {
            toast.error(
                'Something went wrong!',{
                    position:'bottom-center',
                    autoClose:2000,
                    theme:'dark'
                }
                )
            setLoading(false)
        }
    }
    const getReviews = async ()=>{
        const reviews = await axios.get(`/api/products/review/${id}`)
        setProductReviews({rating:reviews.data.ratings,reviews:reviews.data.reviews})
        
    }
    useEffect(()=>{
        console.log(productReviews);
    },[productReviews])
    useEffect(()=>{
        getReviews()
    },[])
    return (
        <div className='bg-slate-900 p-5 md:py-10 md:px-20 rounded border-gray-800 border-2'>
            <div className='md:grid md:grid-cols-3 md:gap-10'>
                <div className='md:px-2 md:mb-0 mb-10'>
                    {
                        isAuthenticated ? (
                            <div>
                                <h3 className='text-3xl mb-5'>Post a review</h3>
                                <form className="max-w-sm mx-auto">
                                    <div className="mb-5">
                                        <label forhtml="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                        <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Dee" value={review.customerName} required />
                                    </div>
                                    <div className="mb-5">
                                        <label forhtml="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='abc@gmail.com' value={review.customerEmail} required />
                                    </div>
                                    <div className="mb-5">
                                        <label forhtml="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                                        <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." value={review.comments} onChange={(e)=>{setReview({...review,comments:e.target.value})}}></textarea>
                                    </div>
                                    <div className="flex mb-5">
                                    {totalStars.map((_, index) => {
                                        return (
                                            <StarIcon
                                                key={index}
                                                value={stars}
                                                className={`h-6 w-6 ${(hoverValue || stars) > index ? 'text-yellow-500':'text-slate-200'}`}
                                                onChange={(e) => setRating(e.target.value)}
                                                // color={(hoverValue || rating) > index ? colors.orange : colors.grey}
                                                onClick={() => handleClickStar(index + 1)}
                                                onMouseOver={() => handleMouseOverStar(index + 1)}
                                                onMouseLeave={() => handleMouseLeaveStar}
                                            />
                                        )
                                    })}
                                    </div>
                                    <button type="submit" className="py-2 hover:cursor-pointer focus:outline-none focus:ring-slate-700 px-4 bg-gradient-to-b w-full font-bold from-violet-800 to-purple-500 hover:from-violet-900 hover:to-purple-600" onClick={(e)=>{submitForm(e)}}>{loading ? 'Processing':'Submit'}</button>
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
                    <h2 className='text-3xl font-semibold mb-4'>{productReviews.rating} reviews</h2>
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
        <div className='p-4 mb-4 border-2 border-slate-700 rounded-md hover:scale-105 hover:shadow-lg transition-all hover:cursor-pointer'>
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
                        <p className='text-slate-300'>{review.comments}</p>
                    </div>
                    <div>
                        <div className="flex md:mb-2 md:justify-end">
                            {
                                [...Array(review.rating)].map((star, index) => (
                                    <StarIcon key={index} className="h-6 w-6 text-yellow-500" />
                                ))
                            }
                        </div>
                        <span className='text-slate-400'>Review Date: {review.createdAt.substring(0, 10)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ReviewCard