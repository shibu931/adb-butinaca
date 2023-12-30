import Product from "/models/product";
import connectToDB from "/utils/dbConnect";
import { getResponseMessage } from "/utils/responseMessage";
import { NextResponse } from "next/server";

connectToDB()

export async function POST(request,{params}) {
    const {productId} = params
    try {
        const review = await request.json()
        const products = await Product.findById(productId);
        if(!products) NextResponse.json("No Product Found",{status:404}) 
        products.ratings = products.ratings+1
        products.reviews.push(review)
        const response = await products.save()
        if(products)
            return NextResponse.json(response,{status:201})
        else
        return getResponseMessage("No Product Found",404,false)
    } catch (error) {
        console.log(error)
        return getResponseMessage("Failed to Add Product Reviews",500,false)
    }
}

export async function GET(req,{params}){
    const {productId} = params
    try {
        const reviews = await Product.findById(productId).select('reviews ratings')
        if(reviews){
            return NextResponse.json(reviews,{
                status:201
            })
        }else{
            return NextResponse.json("No Reviews Found",{
                status:404
            })
        }
    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to Get Product Reviews",500,false)
    } 
} 