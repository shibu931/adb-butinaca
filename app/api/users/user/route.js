import {getDataFromToken} from '/utils/getDataFromToken'
import { NextRequest,NextResponse } from 'next/server';
import User from "/models/userModel"
import connectToDB from "/utils/dbConnect";
import Error from 'next/error';

connectToDB();

export async function GET(req){
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({_id:userId}).select("-password")     
        if(user){
            return NextResponse.json({
                message:"User found",
                data:user
            },{
                status:200
            })
        }else{
            throw new Error
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:400})
    }
}