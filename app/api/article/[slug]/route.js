import Article from "/models/article";
import connectToDB from "/utils/dbConnect";
import { getResponseMessage } from "/utils/responseMessage";
import { NextResponse } from "next/server";

connectToDB()

export async function GET(request,{params}) {
    const {slug} = params
    try {
        const article = await Article.findOne({slug:slug});
        if(article)
            return NextResponse.json(article,{status:200})
        else
        return getResponseMessage("No Article Found",404,false)
    } catch (error) {
        console.log(error)
        return getResponseMessage("Failed to Get Article",500,false)
    }
}

export async function DELETE(request,{params}){
    const {slug} = params
    try {   
        const articleProduct = await Article.findByIdAndDelete(slug);
        if(!articleProduct)
            return getResponseMessage("No Article Found",404,false)
        else 
            return NextResponse.json(articleProduct,{status:200})
    } catch (error) {
        return getResponseMessage(error.message,400,false)
    }
}