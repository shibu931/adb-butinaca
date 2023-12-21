import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema({
    street:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },
    zipCode:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.ObjectId,
        required:true
    },
})

const Address = mongoose.models.address || mongoose.model("address",AddressSchema)

export default Address;