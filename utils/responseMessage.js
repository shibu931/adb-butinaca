import { NextResponse } from "next/server"

export const getResponseMessage =(message,statusCode,successStates)=>{
    return NextResponse.json({
        messsage:message,
        success:successStates
    },{
        status:statusCode
    })
}