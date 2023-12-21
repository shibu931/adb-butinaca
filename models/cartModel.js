import mongoose from 'mongoose';

const CartSchema = new mongoose.Schema({
    item:[
        {product:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
        },
        price:{
            type:String
        },
        quantity:{
            type:Number
        },
        category:{
            type:String
        }
    }],
    userId:{
        type:mongoose.ObjectId,
        required:true
    },
})

const Cart = mongoose.models.cart || mongoose.model("cart",CartSchema)

export default Cart;