import connectToDB from "/utils/dbConnect";
import Order from "/models/orderModel";
import { NextResponse } from "next/server";

import { getResponseMessage } from "/utils/responseMessage";

connectToDB()

export async function GET(req,{params}){
    const {userId} = params
    try {
        const orders = await Order.find({userId:userId})
        if(orders)
        return NextResponse.json(orders,{status:200})
    else
    return getResponseMessage("No Order Found",404,false)
    } catch (error) {
        return getResponseMessage("Failed to Get Orders",500,false)
    }
}

