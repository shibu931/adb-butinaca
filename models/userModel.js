import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
        unique:true
    },
    fullname:{
        type:String,
        required:[true,"Please provide a fullname"],
    },
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
    },
    isVerified:{
        type:Boolean,
        default:false,
        select: false,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:{
        type:String,
        select: false,
    },
    forgotPasswordTokenExpiry:Date,
    verifyToken:{
        type:String,
        select: false,
    },
    verifyTokenExpiry:Date,
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User;