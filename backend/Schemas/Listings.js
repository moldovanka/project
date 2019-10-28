const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Listings = new Schema({
    _id: Schema.Types.ObjectId,
    user: {type: Schema.Types.ObjectId, ref: "Users"},
    event: Object,
    created: Date,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }]
})

module.exports = mongoose.model("Listings", Listings, 'listings');