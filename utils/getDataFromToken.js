import jwt from "jsonwebtoken";
import { cookies } from 'next/headers'

export const getDataFromToken = (request)=>{
    try {
        const cookieStore = cookies()
        const token = cookieStore.get('token')?.value || '';
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET)
        return decodedToken.id;
    } catch (error) {
        console.log(error)
    }
}
