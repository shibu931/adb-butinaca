import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        required: true
    },
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: [true, 'Product ID is required'],
            },
            quantity: {
                type: Number,
                required: [true, 'Product quantity is required'],
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: [true, 'Total amount is required'],
    },
    shipping:{
        type:String,
        enum:[
            'Standarad',
            'Express',
            'Overnight'
        ]
    },
    paymentStatus:{
        type:String,
        default:"Pending"
    },
    orderStatus:{
        type:String,
        enum:[
            'Pending',
            'Processing',
            'Shipped',
            'Delivered',
            'Cancelled'
        ]
    }
}, { timestamps: true });

const Order = mongoose.models.order || mongoose.model("order", CartSchema)

export default Order;