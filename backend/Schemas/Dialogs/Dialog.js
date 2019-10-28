const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Dialog = new Schema({
    _id: Schema.Types.ObjectId,
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Messages"
    }]
})

module.exports = mongoose.model("Dialog", Dialog, 'dialogs');