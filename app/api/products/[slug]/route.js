import Product from "/models/product";
import connectToDB from "/utils/dbConnect";
import { getResponseMessage } from "/utils/responseMessage";
import { NextResponse } from "next/server";

connectToDB()

export async function GET(request,{params}) {
    const {slug} = params
    try {
        const products = await Product.findOne({slug:slug});
        if(products)
            return NextResponse.json(products,{status:200})
        else
        return getResponseMessage("No Product Found",404,false)
    } catch (error) {
        console.log(error)
        return getResponseMessage("Failed to Get Products",500,false)
    }
}