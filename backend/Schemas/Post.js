const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    _id: Schema.Types.ObjectId,
    user: {type: Schema.Types.ObjectId, ref: "Users"},
    create: Schema.Types.Date,
    text: String,
    replies: [{
        type: Schema.Types.ObjectId,
        ref: "PostReplies"
    }]
})

module.exports = mongoose.model("Post", Post, "posts_comments");