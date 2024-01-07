import Product from "/models/product";
import connectToDB from "/utils/dbConnect";
import { getResponseMessage } from "/utils/responseMessage";
import { NextResponse } from "next/server";

connectToDB()

export async function GET(request,{params}) {
    const {slug} = params
    try {
        const products = await Product.find({subCategory:slug});
        if(!products)
            return getResponseMessage("No Product Found",404,false)
        else
            return NextResponse.json(products,{status:200})
    } catch (error) {
        console.log(error)
        return getResponseMessage("Failed to Get Products",500,false)
    }
}

export async function DELETE(request,{params}){
    const {slug} = params
    try {   
        const deletedProduct = await Product.findByIdAndDelete(slug);
        if(!deletedProduct)
            return getResponseMessage("No Product Found",404,false)
        else 
            return NextResponse.json(deletedProduct,{status:200})
    } catch (error) {
        return getResponseMessage(error.message,400,false)
    }
}