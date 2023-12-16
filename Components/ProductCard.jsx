'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
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
  const [item, setItem] = useState(1)
  const [product, setProduct] = useState();
  const decrementItem = () => {
    if (item > 0) setItem(item - 1);
  }
  const incrementItem = () => {
    if (item < 1000) setItem(item + 1);
  }
  const changeItem = (e)=>{
    if(e.target.value<1000 && e.target.value>0)
      setItem(e.target.value)
    else
      setItem(1000)
  }
  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/${`adb-butinaca`}`)
      .then(response => {
        setProduct(response.data[0])
        console.log(product)
        console.log(response.data[0])
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [])
  return (
    <ProductCardSkeleton/>
  )
}

export default ProductCard