import { NextRequest,NextResponse } from 'next/server';
import User from "/models/userModel"
import connectToDB from "/utils/dbConnect";
import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'

connectToDB();

export async function GET(req){
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        const userId = decodedToken.id;
        const user = await User.findById(userId).select("-password")
            return NextResponse.json({
                message:"User found "+userId,
                data:user
            },{
                status:200
            })
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:400})
    }
}