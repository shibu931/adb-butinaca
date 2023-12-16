import React from 'react'

const ProductDescription = ({description}) => {
  return (
    <div className='bg-slate-900 p-5 md:py-10 md:px-20 rounded border-gray-800 border-2'>
        <h2 className='text-2xl font-semibold mb-5'>Product Description</h2>
        <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}

export default ProductDescription