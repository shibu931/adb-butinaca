import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message:"Logout Success",
            success:true
        },{status:200})
        response.cookies.set("token","",
        {httpOnly:true, expires:new Date(0) })        
        return response;
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({error:error.message},{status:500})
    }
}