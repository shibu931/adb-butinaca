import mongoose from 'mongoose'

const connectToDB =async ()=>{
    try {
        mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoB connected successfully');
        })
        connection.on('error',(err)=>{
            console.log('MongoDB connection error. Please make sure MongoDB is running. '+err);
            process.exit();
        })
    } catch (error) {
        console.log("Db not connected");
        console.log(error);
    }
}

export default connectToDB;