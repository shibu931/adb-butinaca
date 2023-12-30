import { NextRequest,NextResponse } from "next/server";
import { getDataFromToken } from '/utils/getDataFromToken'

export async function GET(req){
    const isAuthenticated = getDataFromToken(req);;
    if(isAuthenticated){
    return NextResponse.json({"isAuthenticated":true},{
        status:200
    })
    }else{
        return NextResponse.json({"isAuthenticated":false},{
            status:401
        })  
    }
}

