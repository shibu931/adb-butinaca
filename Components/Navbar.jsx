'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import DropDownMenu from './DropDownMenu'
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import Cart from './Cart'

const navMenu =[
    {
        title:'Buy ADB Butinaca',
        className:'btn-primary rounded-sm',
        slug:'/adb-butinaca'
    },
    {
        title:'Research Chemicals',
        slug:'',
        className:'',
        subMenu:[
            {
                title: "ARYLCYCLOHEXYLAMINES",
                className:'',
                slug: "/products/arylcylohexylamines"
            },
            {
                title: "BENZODIAZEPINES",
                className:'',
                slug: "/products/benzodiazepines"
            },
            {
                title: "BENZOFURAN",
                className:'',
                slug: "/products/benzofuran"
            },
            {
                title: "CANNABINOIDS",
                className:'',
                slug: "/products/cannabinoids"
            },
            {
                title: "CATHINONEN",
                className:'',
                slug: "/products/cathinonen"
            },
            {
                title: "CYCLOHEXANOL",
                className:'',
                slug: "/products/cyclohexanol"
            },
            {
                title: "CYCLOPYRROLON",
                className:'',
                slug: "/products/cyclopyrrolon"
            },
            {
                title: "AMPHETAMINES",
                className:'',
                slug: "/products/amphetamines"
            },
            {
                title: "LYSERGAMIDES",
                className:'',
                slug: "/products/lysergamides"
            },
            {
                title: "NOOTROPICS",
                className:'',
                slug: "/products/nootropics"
            },
            {
                title: "PHENETHYLAMINES",
                className:'',
                slug: "/products/phenethylamines"
            },
            {
                title: "TRYPTAMINES",
                className:'',
                slug: "/products/tryptamines"
            },
            {
                title: "RC LIQUIDS",
                className:'',
                slug: "/products/rc-liquids"
            },
            {
                title: "HERBAL INCENSE",
                className:'',
                slug: "/products/herbal-incense"
            },
            {
                title: "PELLETS",
                className:'',
                slug: "/products/pellets"
            },
            {
                title: "BLOTTERS",
                className:'',
                slug: "/products/blotters"
            },
            {
                title: "CAPSULES",
                className:'',
                slug: "/products/capsules"
            },
            {
                title: "SARMS",
                className:'',
                slug: "/products/sarms"
            }            
        ]
    },
    {
        title:'HHC Shop',
        className:'',
        slug:'/products/hhc-shop',
    },
    {
        title:'Sex Shop',
        className:'',
        slug:'/products/sex-shop'
    },
    {
        title:'Chems Library',
        className:'',
        slug:'/products/chems-library'
    },
    {
        title:'Info',
        className:'',
        slug:'',
        subMenu:[
            {
                title: "Delivery Info",
                className:'',
                slug: "/delivery-info"
            },
            {
                title: "Terms and Conditions",
                className:'',
                slug: "/terms-and-conditions"
            }  
        ]
    },
    {
        title:'Contact',
        className:'',
        slug:'/contact'
    }
    ,{
        title:'About Us',
        className:'',
        slug:'/about-us'
    },
]

const Navbar = ({ img }) => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const showNav = (e) => {
        isNavVisible ? setIsNavVisible(false) : setIsNavVisible(true)
    }

    return (
        <nav >
            <div className="top-nav flex justify-between mx-2 xl:mx-10 my-4">
                <Bars3CenterLeftIcon className="h-10 w-10 lg:w-20 text-gray-500 xl:hidden ms-2 hover:cursor-pointer" onClick={showNav} />
                <Link href="/">
                    <Image
                        src={img.logo.path}
                        width={140}
                        height={50}
                        alt={img.logo.alt}
                    />
                </Link>
                <ul className={`xl:flex bg-gray-900 xl:bg-transparent nav-show my-auto mx-0 ${isNavVisible ? 'show' : ''} z-50`}>
                    <XMarkIcon className="h-6 w-6 text-gray-200 ms-auto xl:hidden hover:cursor-pointer" onClick={showNav} />
                    {
                        navMenu?.map((item, index) => (
                            <li className='text-gray-200 pb-3 lg:pb-0' key={index}>{item.subMenu ? <DropDownMenu options={item} /> : <Link className={`text-lg xl:text-sm font-medium px-4 py-2 ${item.className ? item.className : ''}`} href={item.slug}>{item.title}</Link>}</li>
                        ))
                    }
                </ul>
                <div className='flex'>
                    <Link className='pe-5' href='/profile'>
                        <Image
                            src={img.user}
                            alt='User'
                            width={40}
                            height={40}
                        />
                    </Link>
                    <Cart />
                </div>
            </div>
        </nav>
    )
}

export default Navbar