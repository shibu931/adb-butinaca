import React from 'react'

const ProductDescription = ({title,description}) => {
  return (
    <div className='bg-slate-900 p-5 md:py-10 md:px-20 rounded border-gray-800 border-2 text-white'>
        <h2 className='text-2xl font-semibold mb-5'>{title ? title:'Product Description'}</h2>
        <div dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  )
}

export default ProductDescription