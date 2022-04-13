import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    content: String 
});

export default mongoose.model("message", schema);