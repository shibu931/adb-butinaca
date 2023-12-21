import connectToDB from "/utils/dbConnect";
import Address from "/models/addressModel";
import { NextRequest,NextResponse } from "next/server";

import { getResponseMessage } from "/utils/responseMessage";

connectToDB()

export async function GET(req,{params}){
    const {userId} = params
    try {
        const address = await Address.findOne({userId:userId})
        if(address)
        return NextResponse.json(address,{status:200})
    else
    return getResponseMessage("No Address Found",404,false)
    } catch (error) {
        console.log(error.message)
        return getResponseMessage("Failed to Get Address",500,false)
    }
}

