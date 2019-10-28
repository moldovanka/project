const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Users = new Schema({
    _id: Schema.Types.ObjectId,
    email: String,
    password: String,
    status: Boolean,
    info: {
        avatar: String,
        name: String,
        gender: String,
        about: String,
        address: String,
        phone: String,
        website: String,
        country: String,
        region: String,
        location: {
            lat: String,
            lng: String
        },
        socials: Array,
        listings: [{
            type: Schema.Types.ObjectId,
            ref: "Listings" 
        }],
        savedListings: [{
            type: Schema.Types.ObjectId,
            ref: "Listings" 
        }],
        following: [{
            type: Schema.Types.ObjectId,
            ref: "Users" 
        }],
        followers: [{
            type: Schema.Types.ObjectId,
            ref: "Users" 
        }],
    },
    settings: Object,
    notifications: {
        messages: {
            notifications: [{
                type: Schema.Types.ObjectId,
                ref: "Notifications"
            }],
            unread: {
                type: Number,
                default: 0
            }
        },
        events: {
            notifications: [{
                type: Schema.Types.ObjectId,
                ref: "Notifications"
            }],
            unread: {
                type: Number,
                default: 0
            }
        }
    },
    posts: [{
        type: Schema.Types.ObjectId,
        ref: "Post"
    }],
    dialogs: [{
        type: Schema.Types.ObjectId,
        ref: "Dialog"
    }]
})

module.exports = mongoose.model("Users", Users, 'users');