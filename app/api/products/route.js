import Product from "@/models/product";
import connectToDB from "@/utils/dbConnect";
import { getResponseMessage } from "@/utils/responseMessage";
import { NextResponse } from "next/server";

connectToDB()

export async function GET(request) {
    try {
        const Products = await Product.find();
        return NextResponse.json(Products,{status:200})
    } catch (error) {
        console.log(error)
        return getResponseMessage("Failed to Get Products",500,false)
    }
}

export async function POST(req) {
    try {
        const product = await req.json();
        console.log(product)
        const response = await Product.create(product);
        return NextResponse.json({ "Product ID": response._id }, {
            status: 201,
            statusText: "Product Created"
        })
    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to create Product",500,false)
    }
}
