'use client'
import {useRouter} from 'next/navigation'
import { createContext,useState,useEffect } from 'react'

const CartContext = createContext();

export const CartProvider = ({children})=>{
    const [cart,setCart] = useState([]);
    const router = useRouter;

    const setCartToState = ()=>{
        setCart(
            localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart'))
            :[]
        )
    }

    const addItemToCart = async ({
        product,
        name,
        image,
        quantity=1,
        category
    })=>{
        const item ={
            product,
            name,
            image,
            quantity,
            category
        }

        const isItemExist = cart?.cartItems?.find(
            (i)=> i.product === item.product
        )
        let newCartItems;
        if(isItemExist){
            newCartItems = cart?.cartItems?.map((i)=>
                i.product === isItemExist.product ? item : i
            )
        }else{
            newCartItems = [...(cart?.cartItems || []),item]
        }
        localStorage.setItem("cart",JSON.stringify({cartItems:newCartItems}))
        setCartToState()
    }
    const deleteItemFromCart = (id)=>{
        const newCartItems  = cart?.cartItems?.filter((i)=> i.product !== id)
        localStorage.setItem("cart",JSON.stringify({cartItems:newCartItems}))
        setCartToState()
    }
    useEffect(()=>{
        setCartToState()
    },[])
    return(
        <CartContext.Provider
            value={{cart,
            addItemToCart,
            deleteItemFromCart
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;