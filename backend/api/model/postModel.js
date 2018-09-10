const mongoose = require('mongoose');
const Schema = mongoose.Schema


const postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    like: Number,
    timeStamp: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const commentSchema = new Schema({
    body: String,
    date: Date,
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const Post = mongoose.model('Post', postSchema)
const Comment = mongoose.model('Comment', commentSchema)
module.exports = {
    Post, 
    Comment
} ;