import { NextResponse } from "next/server";
import { sendEmail } from '/utils/adminMailer.js'
import {getDataFromToken} from '/utils/getDataFromToken'

export async function GET(req){
    const message = {
        subject: "Request",
        body: req
    }
    sendEmail(message)
    const isAuthenticated = getDataFromToken(req);
    console.log(isAuthenticated);
    if(isAuthenticated){
    return NextResponse.json({"isAuthenticated":true},{
        status:200
    })
    }else{
        return NextResponse.json({"isAuthenticated":false},{
            status:200
        })  
    }
}

