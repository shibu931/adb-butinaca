import { NextResponse } from "next/server";
import connectToDb from "utils/dbConnect"
import Newsletter from "models/newsletterModel"

connectToDb();

export async function GET(req,{ params }) {
    const {email} = params;
    try {
        const existEmail = await Newsletter.findOne({email});
        if (existEmail)
            return NextResponse.json("Newsletter Subscribed", { status: 201 });
        else {
            await Newsletter.create({email});
            return NextResponse.json("Newsletter Subscribed", { status: 201 })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json(error.message,{status:500})
    }
}