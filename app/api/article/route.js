import Article from "/models/article";
import connectToDB from "/utils/dbConnect";
import { getResponseMessage } from "/utils/responseMessage";
import { NextResponse } from "next/server";
import { getDataFromToken } from '/utils/getDataFromToken'
import User from "/models/userModel"

connectToDB()

export async function GET(request) {
    try {
        const Articles = await Article.find().select("-description");
        if(Articles)
            return NextResponse.json(Articles,{status:200})
        else   
            return NextResponse.json({message:"No Article found"},{status:200})
    } catch (error) {
        return getResponseMessage("Failed to Get Article",500,false)
    }
}

export async function POST(req) {
    try {
        const userId = getDataFromToken(req)
        const user = await User.findById(userId)
        if(user.isAdmin){
            const article = await req.json();
        const response = await Article.create(article);
        return NextResponse.json({ "Article ID": response._id }, {
            status: 201,
            statusText: "Article Created"
        })
        }else{
            return NextResponse.json("Forbidden",{status:403})
        }
        
    } catch (error) {
        console.log(error);
        return getResponseMessage("Failed to create Article",500,false)
    }
}

export async function PUT(req){
    try {
        const userId = getDataFromToken(req)
        const user = await User.findById(userId)
        if(user.isAdmin){
        const articleData = await req.json()
        const updatedArticle = await Article.findByIdAndUpdate(articleData._id, articleData, { new: true })
        return NextResponse.json({ "Article ID": updatedArticle._id }, {
            status: 201,
            statusText: "Article Updated"
        })
        }else{
            return NextResponse.json("Forbidden",{status:403})
        }
    } catch (error) {
        console.log(error)
        return getResponseMessage("Failed to update Article",500,false)
    }
}
