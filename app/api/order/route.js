import Order from "/models/orderModel";
import connectToDB from "/utils/dbConnect";
import { getResponseMessage } from "/utils/responseMessage";
import { NextResponse } from "next/server";
import { getDataFromToken } from '/utils/getDataFromToken'
import User from "/models/userModel"
import Address from "/models/addressModel";
import { sendEmail } from '/utils/adminMailer.js'
import generateProductList from '/utils/generateProductList.js'
import { sendTelegramNotification } from "../../../utils/sendTelegramNotification";

connectToDB()

export async function POST(req) {
    try {
        const { cartItems } = await req.json();
        const userId = await getDataFromToken(req);
        const totalCartAmount = cartItems?.reduce((acc, item) => acc + item.price, 0)
        const newOrder = new Order({
            userId,
            products: cartItems,
            totalAmount: totalCartAmount,
            Shipping: 'Not Shipped',
            orderStatus: 'Processing'
        })
        const user = await User.findById(userId)
        const address = await Address.findOne({ userId: userId })
        const message = {
            subject: "New order is generated",
            body: `<h2>User Name: ${user.fullname} </h2><h2>User Email: ${user.email} </h2><h2>Address: ${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country} </h2> <h2>Phone No.: ${address.phoneNo}</h2>` + generateProductList(cartItems) + `<p style="font-size:22px; font-weight:700">Total Amount: ${totalCartAmount}</p>`
        }
        sendTelegramNotification(`
        🛍️ New Order Notification 🛍️
        
        Customer Email: ${user.email}
        Customer Name: ${user.fullname}
        Total Amount: ${totalCartAmount}
        
        Items:
        ${cartItems.map((item) => `${item.name} - ${item.quantity}x`).join('\n')}
        
        Shipping Address:
        Street: ${address.street}
        City: ${address.city}
        Provision: ${address.state}
        Zip Code: ${address.zipCode}
        Country: ${address.country}
        Phone Number: ${address.phoneNo}
        `)
        sendEmail(message)
        const response = await Order.create(newOrder);
        return NextResponse.json({ "Order ID": response._id }, {
            status: 201,
            statusText: "Order Created"
        })
    } catch (error) {
        return getResponseMessage("Failed to create Order", 500, false)
    }
}
