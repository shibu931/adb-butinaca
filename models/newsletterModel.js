import mongoose from 'mongoose';

const headerItemSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    }
}, { timestamps: true })

const Newsletter = mongoose.models.newsletter || mongoose.model('newsletter',headerItemSchema)

export default Newsletter