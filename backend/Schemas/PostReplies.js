const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostReplies = new Schema({
    _id: Schema.Types.ObjectId,
    user: {type: Schema.Types.ObjectId, ref: "Users"},
    create: Schema.Types.Date,
    text: String,
})

module.exports = mongoose.model("PostReplies", PostReplies, "posts_replies");