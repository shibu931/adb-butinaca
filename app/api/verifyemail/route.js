import connectToDB from "/utils/dbConnect";
import User from "/models/userModel";
import { NextResponse } from "next/server";

connectToDB();

export async function POST(req){
    try {
        const reqBody = await req.json()
        const {token} = reqBody
        
        const user =await User.findOne({verifyToken:token,
            verifyTokenExpiry:{$gt:Date.now()}
        })

        if(!user){
            console.log("Error 1")
            return NextResponse.json({error:"Invalid token"},{status:400})
        }

        user.isVerified = true
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined
        await user.save();

        return NextResponse.json({
            message:"Message Verified Success",
            success:true
        })

    } catch (error) {
        console.log("Error 2")
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }
}