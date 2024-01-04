import Product from "/models/product";
import connectToDB from "/utils/dbConnect";
import { getResponseMessage } from "/utils/responseMessage";
import { NextResponse } from "next/server";
import { getDataFromToken } from '/utils/getDataFromToken'
import User from "/models/userModel"

connectToDB()

export async function GET(request) {
    try {
        const Products = await Product.find().select("-description -summary -price -reviews");
        if(Products)
            return NextResponse.json(Products,{status:200})
        else   
            return NextResponse.json({message:"No Products found"},{status:200})
    } catch (error) {
        return getResponseMessage("Failed to Get Products",500,false)
    }
}

export async function POST(req) {
    try {
        const userId = getDataFromToken(req)
        const user = await User.findById(userId)
        if(user.isAdmin){
            const product = await req.json();
        const response = await Product.create(product);
        return NextResponse.json({ "Product ID": response._id }, {
            status: 201,
            statusText: "Product Created"
        })
        }else{
            return NextResponse.json("Forbidden",{status:403})
        }
        
    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to create Product",500,false)
    }
}

export async function PUT(req){
    try {
        const userId = getDataFromToken(req)
        const user = await User.findById(userId)
        if(user.isAdmin){
        const productData = await req.json()
        const updatedProduct = await Product.findOneAndUpdate({ slug: productData.slug }, productData, { new: true })
        return NextResponse.json({ "Product ID": updatedProduct._id }, {
            status: 201,
            statusText: "Product Updated"
        })
        }else{
            return NextResponse.json("Forbidden",{status:403})
        }
    } catch (error) {
        console.log(error)
        return getResponseMessage("Failed to update Product",500,false)
    }
}
