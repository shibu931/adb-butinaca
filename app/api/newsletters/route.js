import { NextResponse } from "next/server";
import connectToDb from "utils/dbConnect"
import Newsletter from "models/newsletterModel"

connectToDb();

export async function GET() {
    try {
        const email = await Newsletter.find();
        if(email){
            return NextResponse.json(email,{status:200})
        }else{
            return NextResponse.json("No email found",{status:200})
        }
    } catch (error) {
        return NextResponse.json(error.message,{status:500})
    }
}