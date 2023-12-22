import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    slug:{
        type:String,
        required:[true,'Product Slug Must neccessary']
    },
    name:{
        type:String,
        required:[true,'Please Enter Product Name']
    },
    description:{
        type:String,
        required:[true,'Please Enter Product Description']
    },
    summary:{
        type:String,
        required:[true,'Please Enter Product Description']
    },
    price:[
        {
            quantity:{
                type:Number
            },
            price:{
                type:String,
                required:[true,'Please Enter Product Price']
            }
        }
    ],
    img:
    {
            thumb:{
                type:String,
            },
            url:{
                type:String,
            },
    },
    category:{
        type:String,
        required:[true,'Please enter Product Category'],
    },
    subCategory:{
        type:String,
        required:[true,'Please enter Product Category'],
    },
    ratings:{
        type:Number,
        default:0
    },
    reviews:[
        {
            rating:{
                type:Number,
                required:true
            },
            comments:{
                type:String,
                required:true
            },
            createdAt:{
                type:Date,
                default:Date.now,
            }
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export default mongoose.models.Product || mongoose.model('Product',productSchema)