import React from 'react'

const ProductDescription = ({product}) => {
  return (
    <div className='text-white'>
        <h2 className='text-3xl font-semibold mb-5'>Product Description</h2>
        <div>
            {product.content}
        </div>
    </div>
  )
}

export default ProductDescription