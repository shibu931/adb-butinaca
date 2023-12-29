import { NextResponse } from "next/server";

export async function GET(req){
    const isAuthenticated = req.cookies.get("token");
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

