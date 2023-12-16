import Image from "next/image"
import Link from "next/link"

 const ProductList = ({ product }) => {
    return (
      <div className='flex p-4 bg-slate-800 rounded'>
        <Image
          className='rounded '
          src={product.img.url}
          width={50}
          height={50}
        />
        <div className='ms-5'>
          <h2 className='text-xl'>{product.name}</h2>
          <span className='text-xs'>{product.category}</span>
        </div>
        <div className='ms-auto my-auto'>
          <Link href={'/'} className='mx-2 bg-green-700 px-4 rounded py-2'>
            Edit
          </Link>
          <Link href={'/'} className='mx-2 bg-red-700 px-4 rounded py-2'>
            Delete
          </Link>
        </div>
      </div>
    )
  }

  export default ProductList