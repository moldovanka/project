const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Notifications = new Schema({
    _id: Schema.Types.ObjectId,
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    },
    messages: {
        message: String,
        link: String,
        created: Date
    },
})

module.exports = mongoose.model("Notifications", Notifications, "notifications");