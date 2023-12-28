import mongoose from 'mongoose'

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        })
        connection.on('error', (err) => {
            console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
            throw err; // Reject by throwing the error
        })
    } catch (error) {
        console.log("Db not connected");
        console.log(error);
        throw error; // Reject by throwing the error
    }
}

export default connectToDB;