'use client'
import Image from 'next/image'
import React, { useEffect, useState,useContext } from 'react'
import { StarIcon } from "@heroicons/react/20/solid";
import { Tab } from '@headlessui/react'
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import ProductDescription from './ProductDescription';
import ReviewCard from './ReviewCard';
import axios from 'axios';
import ProductCardSkeleton from './ProductCardSkeleton';
import CartContext from '../context/CartContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const product = {
  title: 'ADB-Butinaca',
  description: 'ADB-Butinaca (ADBB) is an indole-based synthetic cannabinoid, a structural analog of MDMB-BUTINACA and a potent CB1 and CB2 receptor agonist (reported EC50 values of 0.52 nM and 0.88 nM).',
  description2: 'You can get acquainted with the prices and buy ADB-Butinaca online right now, at OnmiChemistry company. We provide all the necessary information about the products and provide a quality guarantee.',
  content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum praesentium eligendi vel nulla exercitationem cupiditate assumenda voluptatum, dolores consequatur consectetur, ducimus mollitia eveniet incidunt maxime atque? Possimus hic illo quibusdam unde est aperiam nesciunt blanditiis, magnam accusamus eaque facere error non labore, quia ratione? Accusantium ipsa reprehenderit, doloremque veniam praesentium harum eum minus ullam nostrum sapiente. Labore ab natus nemo excepturi nisi unde at assumenda dicta consequuntur, dolor quas quos cum enim vitae! Voluptatum, impedit quidem. Sint quam eaque, deleniti praesentium ipsa obcaecati hic iusto accusantium blanditiis! Facilis voluptate ut voluptatibus cupiditate! Illum consequatur sit fuga odio nemo vero doloremque repellat labore ipsa provident mollitia exercitationem maiores tenetur aspernatur deserunt nulla eius dolorem quae natus, voluptas ut modi! Optio, quaerat corrupti esse iusto cupiditate, rem veniam odio perferendis laudantium ut, ipsum tempore aliquam dolor in veritatis autem nemo sed asperiores reprehenderit eum sapiente. Quia veritatis sint ipsam consectetur repellendus soluta atque nisi rem, dolore vitae, quae aperiam! Deserunt provident vero facilis, similique animi rerum possimus nihil dicta, error a, at modi et? Reiciendis sunt aliquam eveniet, necessitatibus ex aperiam iusto nostrum. Dignissimos, quam! Molestias quia voluptatum harum, maiores excepturi magni, illo, cupiditate repellendus blanditiis consectetur commodi perspiciatis? Nisi quisquam molestias illo accusamus quam quis tenetur tempora? Commodi nemo omnis vero atque, amet saepe voluptate, sit dicta minus neque, eligendi maxime molestiae praesentium illo ex! Id, saepe et? Maiores ratione, mollitia provident, quisquam a magnam cum, error incidunt inventore eum odio ullam consectetur dolore officiis deserunt cupiditate accusantium? Iure quasi ipsum dicta. Vero adipisci maxime id, doloribus natus autem, quisquam, eos dicta suscipit veniam deleniti quibusdam tenetur. Fugit nobis ex blanditiis inventore rerum maxime harum repudiandae, omnis ea ipsa obcaecati id similique totam labore, placeat optio animi at quo voluptates iste itaque minus neque molestiae magni. Sequi rem alias neque excepturi.',
  img: 'https://placehold.co/440x650',
  price: '',
  discountedPrice: '12.44'
}


const ProductCard = () => {
  const {addItemToCart} = useContext(CartContext);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState(1)
  const [product, setProduct] = useState();
  const [price, setPrice] = useState(25);
  const decrementItem = () => {
    if (item > 0) setItem(item - 1);
  }
  const incrementItem = () => {
    if (item < 1000) setItem(item + 1);
  }
  const changeItem = (e) => {
    if (e.target.value < 1000 && e.target.value > 0)
      setItem(e.target.value)
    else
    setItem(1000)
}
  const addToCartHandler = ()=>{
    addItemToCart({
      product:product._id,
      name:product.name,
      image:product.img.url,
      price:price,
      category:product.category,
      quantity:item
    })
    toast.success(
      'Product Added to cart',{
        position:'bottom-right',
        autoClose:2000,
        theme:'dark'
      }
    )
  }
  const getPriceForQuantity = (quantity) => {    
    if(product){
      const sortedPrices = product.price.slice().sort((a, b) => b.quantity - a.quantity);
      const currentPrice = sortedPrices.find(item => item.quantity <= quantity);
      if (currentPrice) {
        const price =currentPrice.price.match(/\d+/);
        setPrice(price*quantity)
      }
    }
  }
  
  useEffect(() => {
    axios.get(`/api/products/${`adb-butinaca`}`)
      .then(response => {
        setProduct(response.data)
        setIsLoaded(true)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])
  useEffect(()=>{
    getPriceForQuantity(item)
  },[item,product])
  return (
    <div>
      {
        isLoaded ? <div>
          <div className='my-10 flex flex-wrap gap-10 md:flex-nowrap min-w-'>
            <div className='md:min-w-28 mx-auto'>
              <Image
                src={product.img.url}
                alt={product.name}
                height={650}
                width={440}
                priority
              />
            </div>
            <div className='text-gray-100 flex flex-col justify-center flex-grow-0'>
              <span className='text-gray-500 text-sm md:text-lg'>{product.category}</span>
              <h1 className='text-4xl md:text-6xl font-medium'><span className='bg-gradient-to-r to-purple-500 from-violet-800 text-transparent bg-clip-text'>{product.name}</span></h1>
              <div className="flex mt-2">
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <StarIcon className="h-6 w-6 text-yellow-500" />
                <StarIcon className="h-6 w-6 text-yellow-500" />
              </div>
              <p
                className='mb-5'
              >123 <span className='bg-yellow-400 font-extrabold text-transparent bg-clip-text '>Reviews</span>
              </p>
              {/* &#x20AC; */}
              <p className='text-md mb-5'>{product.summary}</p>
              <table class="min-w-full text-left text-sm font-light  border border-neutral-500 md:block hidden">
                <tbody className=''>
                  <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 border-neutral-500 dark:hover:bg-neutral-600">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">Quantity:</td>
                    {
                      product?.price.map((item, index) => (
                        <td className="whitespace-nowrap px-6 py-4 border border-neutral-500" key={index}>{item.quantity}</td>
                      ))
                    }
                  </tr>
                  <tr
                    className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 border-neutral-500 dark:hover:bg-neutral-600 "
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">Price:</td>
                    {
                      product?.price.map((item, index) => (
                        <td className="whitespace-nowrap px-6 py-4 border border-neutral-500" key={index}>{item.price}</td>
                      ))
                    }
                  </tr>
                </tbody>
              </table>
              <table class="min-w-full text-left text-sm font-light  border border-neutral-500 md:hidden">
                <thead>
                  <tr>
                    <td className="whitespace-nowrap px-6 py-4 border border-neutral-500"><strong>Quantity</strong></td>
                    <td className="whitespace-nowrap px-6 py-4 border border-neutral-500"><strong>Price</strong></td>
                  </tr>
                </thead>
                <tbody className=''>
                  {
                    product?.price.map((item, index) => (
                      <tr key={index}>
                        <td className="whitespace-nowrap px-6 py-2 border border-neutral-500" >{item.quantity}</td>
                        <td className="whitespace-nowrap px-6 py-2 border border-neutral-500" >{item.price}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
              <div className="mt-5">
                <h3 className='text-xl font-light'>Total Amount: <span className='text-purple-600 font-bold'>{price}€</span></h3>
              </div>
              <div className="flex gap-5 flex-grow-0 mt-5">
                <div className='flex'>
                  <button className='bg-violet-800 w-10 text-3xl h-10 text-center pb-1 font-extrabold' onClick={decrementItem} >-</button>
                  <input type="number" className='bg-gray-200 text-black text-2xl w-16 h-10 text-center font-bold pt-1' value={item} onChange={(e) => { changeItem(e.target.value) }} />
                  <button className='bg-violet-800 text-3xl w-10 h-10 text-center pb-1 font-extrabold' onClick={incrementItem} >+</button>
                </div>
                <button onClick={addToCartHandler} className='py-1 px-4 bg-gradient-to-b font-bold from-violet-800 to-purple-500 hover:from-violet-900 hover:to-purple-600'>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
          <div className='text-white '>
            <Tab.Group >
              <Tab.List className='w-full max-w-md px-2 sm:px-0 mx-auto mb-5 flex space-x-1 rounded-xl bg-blue-900/20 p-1'>
                <Tab className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-1 ring-offset-blue-900 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }>Description</Tab>
                <Tab className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg px-2 py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-1 ring-offset-blue-900 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }>Additional Information</Tab>
                <Tab className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white/60 ring-offset-1 ring-offset-blue-900 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }>Reviews</Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel><ProductDescription description={product.description} /></Tab.Panel>
                <Tab.Panel>
                  <div className='bg-slate-900 p-5 md:py-10 md:px-20 rounded border-gray-800 border-2'>
                    <TableContainer>
                      <Table variant='simple'>
                        <Tbody>
                          <Tr className='align-top'>
                            <Td ><strong>Shipping: </strong></Td>
                            <Td>Room Temperature in <br className='md:hidden' />continental US; may vary<br className='md:hidden' /> elsewhere</Td>
                          </Tr>
                          <Tr>
                            <Td><strong>Storage: </strong></Td>
                            <Td>-20°C</Td>
                          </Tr>
                          <Tr>
                            <Td><strong>Stability: </strong></Td>
                            <Td>≥ 5 years</Td>
                          </Tr>
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </div>
                </Tab.Panel>
                <Tab.Panel>
                  <ReviewCard />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
          :
          <ProductCardSkeleton />
      }
    </div>
  )
}

export default ProductCard