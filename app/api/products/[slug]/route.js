import Product from "/models/product";
import connectToDB from "/utils/dbConnect";
import { getResponseMessage } from "/utils/responseMessage";
import { NextResponse } from "next/server";

connectToDB()

export async function GET(request,{params}) {
    const {slug} = params
    try {
        const Products = await Product.find({slug:slug});
        return NextResponse.json(Products,{status:200})
    } catch (error) {
        console.log(error)
        return getResponseMessage("Failed to Get Products",500,false)
    }
}