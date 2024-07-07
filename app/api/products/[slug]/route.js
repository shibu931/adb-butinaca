import Product from "/models/product";
import Article from "/models/article";
import connectToDB from "/utils/dbConnect";
import { getResponseMessage } from "/utils/responseMessage";
import { NextResponse } from "next/server";

connectToDB()

export async function GET(request,{params}) {
    const {slug} = params
    try {
        const products = await Product.find({subCategory:slug});
        if(products.length != 0){
            const data =  {
                dataType:'products',
                data:products
            }
            return NextResponse.json(data,{status:200})
        }
        else{
            const articles = await Article.findOne({slug:slug});
            if(articles){
                const data =  {
                    dataType:'article',
                    data:articles
                }
                return NextResponse.json(data,{status:200})
            }else{
                return getResponseMessage("Failed to Get Products",500,false)
            }
        }
    } catch (error) {
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