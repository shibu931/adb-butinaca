import React from 'react'

const ProductCardSkeleton = () => {
    return (
        <>
            <div className='flex flex-wrap gap-10 md:gap-20 md:flex-nowrap my-10'>
                <div className='md:w-2/4'>
                    <div className='rounded-md mx-auto animate-pulse bg-gray-400 transition-all w-[350px] h-[500px]'>

                    </div>
                </div>
                <div className='my-auto'>
                    <div className='h-6 rounded w-[200px] animate-pulse bg-gray-400'></div>
                    <div className='h-16 mt-2 w-[350px] animate-pulse bg-gray-400 rounded'></div>
                    <div className='h-16 mt-2 w-[250px] animate-pulse bg-gray-400 rounded'></div>
                    <div className='bg-gray-400 rounded animate-pulse w-[340px] md:w-[900px] mt-5 h-24 rounded-bl-none'></div>
                    <div className='h-4 w-[260px] md:w-[400px] animate-pulse bg-gray-400 rounded-br rounded-bl'></div>
                    <div className='h-20 mt-4 min-w-full animate-pulse bg-gray-400 rounded'></div>
                    <div className='h-16 mt-10 w-[350px] animate-pulse bg-gray-400 rounded'></div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className='h-20 mt-2 w-[350px] animate-pulse bg-gray-400 rounded'></div>
            </div>
        </>
    )
}

export default ProductCardSkeleton