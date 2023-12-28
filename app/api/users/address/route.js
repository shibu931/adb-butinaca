import connectToDB from "/utils/dbConnect";
import Address from "/models/addressModel";
import { NextResponse } from "next/server";

import { getResponseMessage } from "/utils/responseMessage";

connectToDB();

export async function POST(req) {
    try {
        const reqBody = await req.json()
        const { street,city,phoneNo,state,zipCode,country,userId } = reqBody

        const existingAddress = await Address.findOne({userId:userId});
        let updatedAddress;
        if(existingAddress){
            existingAddress.street = street;
            existingAddress.city = city;
            existingAddress.phoneNo = phoneNo;
            existingAddress.state = state;
            existingAddress.zipCode = zipCode;
            existingAddress.country = country;
            updatedAddress = await Address.findByIdAndUpdate(existingAddress._id,existingAddress,{new:true})
        }else{
            const newAddress = new Address({
                street,
                city,
                phoneNo,
                state,
                zipCode,
                country,
                userId
            })
    
            updatedAddress = await newAddress.save()
        }

        return NextResponse.json({
            message: "Address created successfully",
            success: true,
            updatedAddress
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

export async function PUT(req){
    try {
        const reqBody = await req.json()
        const addressData = reqBody
        const updatedAddress = Address.findByIdAndUpdate(_id,addressData,{new:true})
        if(updatedAddress)
            return NextResponse.json(updatedAddress,{status:200})
        else
            return getResponseMessage("Failed to update address",500,false)
    } catch (error) {
        console.log(error)
        return getResponseMessage("Failed to update Address",500,false)
    }
}

