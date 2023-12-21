import connectToDB from "/utils/dbConnect";
import User from "/models/userModel";
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "../../../../utils/mailer";

connectToDB();

export async function POST(req){
    try {
        const reqBody = await req.json()
        const {fullname,username,email,password} = reqBody
        const user = await User.findOne({email})
        if(user) return NextResponse.json({error:"Email already registered"},{status:400})

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            fullname,
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()

        await sendEmail({email,emailType:"VERIFY",userId: savedUser._id})
        
        return NextResponse.json({
            message:"User created successfully",
            success:true,
            savedUser
        }) 

    } catch (error) {
        console.log(error)
        return NextResponse.json({error:error.message},{status:500})
    }
}


