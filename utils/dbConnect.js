import mongoose, { mongo } from 'mongoose'

const connectToDB =()=>{
    try {
        if(mongoose.connection.readyState >=1)
        return
        mongoose.set('strictQuery',false)
        mongoose.connect(process.env.MONGODB_URI)
        console.log("DB Connected")
    } catch (error) {
        console.log("Db not connected")
    }

}

export default connectToDB;