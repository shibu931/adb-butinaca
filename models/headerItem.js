import mongoose from 'mongoose';

const headerItemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    className:{
        type:String
    },
    slug:{
        type:String,
        required:true
    },
    submenu:[
        {
            title:{
                type:String,
            },
            slug:{
                type:String,
            },
        }
    ]
})

export default mongoose.models.HeaderItem || mongoose.model('HeaderItem',headerItemSchema)