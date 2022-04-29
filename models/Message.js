import mongoose from 'mongoose';

const schema = mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    content: String,
    sentAt: {
        type: Date,
        default: Date.now()
    }
});

export default mongoose.model("message", schema);