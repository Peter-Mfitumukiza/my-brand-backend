import mongoose from 'mongoose';

const schema = mongoose.Schema({
    title: String,
    description: String,
    content: String,
    cover: String,
    publish: Boolean,
    enableComments: Boolean,
    comments:[],
    likes:[],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

export default mongoose.model("article", schema);