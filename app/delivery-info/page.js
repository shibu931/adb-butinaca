import React from 'react'

const Info = ({ params }) => {
    return (
        <div className='text-white mt-10 lg:mx-20 mx-10'>
            <div className='bg-slate-900 p-5 md:py-10 md:px-20 rounded border-gray-800 border-2'>
                <h1 className='text-3xl font-semibold mb-5 text-center'>Delivery Info</h1>
                <div className="mb-5">
                <h2 className='text-2xl font-semibold mb-2'>
                    Delivery Information
                </h2>
                <p>We always ship from the Netherlands with a secure express courier service.</p>
                </div>
                <div className="mb-5">
                <h2 className='text-2xl font-semibold mb-2'>
                    Delivery time
                </h2>
                <ul>
                    <li><strong className='font-semibold'>In the Netherlands:</strong> 1-2 business days.</li>
                    <li><strong className='font-semibold'>In Europe:</strong> 3-6 business days.</li>
                    <li><strong className='font-semibold'>Outside Europe:</strong> 4-8 business days.</li>
                </ul>
                </div>
                <div className='mb-5'>
                <h2 className='text-2xl font-semibold mb-2'>
                    Shipping fee
                </h2>
                <p>The shipping fee is 20 euros under the order not exceeding 200 euro.</p>
                <p>The shipping fee is free for orders exceeding 200 euro.</p>
                </div>
                <div className="mb-5">
                    <h2 className="text-2xl font-semibold mb-2">
                    Resend Policy
                    </h2>
                    <p>We provide a one -time resend for all customer if the package stops at customs.</p>
                    <p>Customer pays 50% again and we will send the full order again.</p>
                </div>
            </div>
        </div>
    )
}

export default Info