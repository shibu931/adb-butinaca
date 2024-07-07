import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    slug:{
        type:String,
        required:[true,'Article Slug Must neccessary']
    },
    title:{
        type:String,
        required:[true,'Please Enter Article Title']
    },
    description:{
        type:String,
        required:[true,'Please Enter Article Description']
    },
    category:{
        type:String,
        required:[true,'Please Enter Article Category'],
    },
    subCategory:{
        type:String,
        required:[true,'Please Enter Article Sub Category'],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

export default mongoose.models.Article || mongoose.model('Article',articleSchema)