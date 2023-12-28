import { NextResponse } from "next/server";

export async function GET(req){
    const isAuthenticated = req.cookies && req.cookies.get("token");
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

