const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Messages = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users" 
    },
    message: String,
    created: Date,
})

module.exports = mongoose.model("Messages", Messages, 'messages');