import connectToDB from "/utils/dbConnect";
import User from "/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

connectToDB();

export async function POST(req){
    try {
        const reqBody = await req.json();
        const {email,password} = reqBody
        console.log(reqBody)
        const user = await User.findOne({email})
        console.log(user)
        if(!user)
            return NextResponse.json({error:"User does not exist"},{status:400})
    
        const validPassword = await bcryptjs.compare(password,user.password)
        console.log("running")
        if(!validPassword)
            return NextResponse.json({error:"Password is invalid"},{status:400})
        
        const tokenData = {
            id:user._id,
            fullname:user.fullname,
            username:user.username,
            email:user.email
        }
        
        const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"})

        const response = NextResponse.json({message:"Login Success"},{status:200})
        response.cookies.set("token",token, {httpOnly:true})
        return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:'Something went wrong'},{status:500})
    }
}