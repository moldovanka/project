const mongoose = require('mongoose');
const express = require('express');
const app = express();
var http = require("http").Server(app);
const io = require('socket.io')(http);

const bodyParser = require('body-parser');
let cors = require('cors');

const Users = require("./Schemas/Users");
const Post = require("./Schemas/Post");
const PostReplies = require("./Schemas/PostReplies");
const Listings = require("./Schemas/Listings");
const Dialog = require("./Schemas/Dialogs/Dialog");
const Message = require("./Schemas/Dialogs/Message");
const Notifications = require("./Schemas/Notifications");


const API_PORT = process.env.PORT || 3001;

app.use(cors());
const dbAuth = "mongodb+srv://admin:Andrei123456789@social-cktj1.mongodb.net/social?retryWrites=true&w=majority";

mongoose.connect(dbAuth, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



io.on("connection", (socket) => {
    socket.on('leave', (data) => {
        Users.findByIdAndUpdate(data.user, {
            status: false
        }, (err, result) => {
            
        })
    })
})

//AUTH
app.post('/registration', (req, res) => {
    const data = req.body;
   
    Users.findOne({email: data.email}, (err, docs) => {
        if(err) return res.send({status: 400, message: err});
        if(docs) {
            return res.send({status: 400, message: "User exists"})
        } else {
            const user = new Users({
                _id: new mongoose.Types.ObjectId(),
                email: data.email.toLowerCase(),
                password: data.password,
                status: false,
                info: {
                    avatar: "https://cdn3.iconfinder.com/data/icons/vector-icons-6/96/256-512.png",
                    name: data.name.toLowerCase(),
                    gender: data.gender.toLowerCase(),
                    about: "I'm a new user",
                    address: "",
                    phone: "",
                    website: "",
                    country: data.country.toLowerCase(),
                    region: "",
                    location: {
                        lat: "",
                        lng: ""
                    },
                    socials: [
                        {
                            social: "facebook",
                            url: ""
                        },
                        {
                            social: "twitter",
                            url: ""
                        },
                        {
                            social: "instagram",
                            url: ""
                        },
                    ],
                    listings: [],
                    savedListings: [],
                    following: [],
                    followers: [],
                },
                notifications: {
                    messages: {
                        notifications: [],
                        unread: 0
                    },
                    events: {
                        notifications: [],
                        unread: 0
                    }
                },
                settings: {
                    notifications: {
                        listings: false,
                        follow: false
                    },
                    privacy: {
                        email: "everyone",
                        friends: "everyone"
                    }
                },
                posts: [],
                dialogs: [],
            })
            user.save(err => {
                if(err) return res.send({status: 400, message: err});
                res.send({status: 200})
            })
        }
    })

    
})
app.post('/login', (req, res) => {
    const data = req.body;
    Users.findOne({
        email: data.email.toLowerCase(),
        password: data.password
    }, (err, user) => {
        if(err) return res.send({status: 400, message: err});
        if(user) {
            user.status = true;
            user.save();
            res.send({status: 200, user});
        } else {
            return res.send({status: 404, message: "Invalid email or password"});
        }
    })
})
app.put('/auth/:id', async (req, res) => {
    const user = req.params.id;
    Users.findByIdAndUpdate(user, {
        status: true
    }, (err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200});
    })
})
app.put("/logout/:id", async (req, res) => {
    const userID = req.params.id;
    const user = await Users.findById(userID);
    user.status = false;
    user.save(err => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200});
    })
})
// USER
app.get('/user/:id', (req, res) => {
    const userID = req.params.id;
    Users.findById(userID, "email info settings posts dialogs", (err, user) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, user});
    })
})
app.post('/avatarUpdate/:id', async (req, res) => {
    const userID = req.params.id;
    const avatar = req.body.avatar;
    const user = await Users.findByIdAndUpdate(userID);
    user.info.avatar = avatar;
    user.save(err => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, message: "Image has been upload"});
    })
})
app.post('/addUserPost/:id', async (req, res) => {
    const sender = req.params.id;
    const target = req.body.target;
    const message = req.body.message;
    const receiver = await Users.findById(target);

    const post = new Post({
        _id: mongoose.Types.ObjectId(),
        user: mongoose.Types.ObjectId(sender),
        create: Date.now(),
        text: message,
        replies: []
    })
    post.save(err => {
        if(err) return res.send({status: 400, message: err});
        receiver.posts.push(post._id);
        receiver.save(err => {
            if(err) return res.send({status: 400, message: err});
            io.emit(`user_post:${target}`)
            res.send({status: 200, message: "post has been added"});
        })
    })
})
app.delete('/removeUserPost/:id', async (req, res) => {
    const userID = req.params.id;
    const postID = req.body.post;
    const post = await Post.findById(postID);
    
    Users.findByIdAndUpdate(userID, {
        $pull: {posts: postID}
    }, (err, docs) => {
        if(err) return res.send({status: 400, message: err});
        PostReplies.deleteMany({_id: {$in: post.replies}}, err => {
            if(err) return res.send({status: 400, message: err});
        });
        Post.findByIdAndDelete(postID, err => {
            if(err) return res.send({status: 400, message: err});
        });
        io.emit(`user_post:${userID}`)
        res.send({status: 200, message: "Post has been deleted"});
    })
})
app.get('/getUserPosts/:id', (req, res) => {
    const userID = req.params.id;
    Users.findById(userID, "posts").
    populate("posts").
    populate({
        path: "posts",
        populate: {
            path: "user",
            select: "info.name info.avatar"
        }
    }).
    populate({
        path: "posts",
        populate: {
            path: "replies",
            populate: {
                path: "user",
                select: "info.name info.avatar"
            }
        }
    }).
    exec((err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, posts: result.posts});
    })
})
app.get('/getUserPostsReplies/:post', (req, res) => {
    const postID = req.params.post;
    Post.findById(postID, "replies").
    populate({
        path: "replies",
            populate: {
                path: "user",
                select: "info.name info.avatar"
            }
    }).
    exec((err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, replies: result.replies});
    })

})
app.put("/addUserPostReply/:id", async (req, res) => {
    const sender = req.params.id;
    const postID = req.body.post;
    const message = req.body.message;
    const post = await Post.findById(postID)

    const reply = new PostReplies({
        _id: mongoose.Types.ObjectId(),
        user: mongoose.Types.ObjectId(sender),
        create: Date.now(),
        text: message
    })
    reply.save(err => {
        if(err) return res.send({status: 400, message: err});
        post.replies.push(reply._id);
        post.save(err => {
            if(err) return res.send({status: 400, message: err});
            io.emit(`comment_actions:${postID}`)
            res.send({status: 200, message: "reply has been added"});
        })
    })
})
app.put("/removeUserPostReply", async (req, res) => {
    const postID = req.body.post;
    const replyID = req.body.reply;

    PostReplies.findByIdAndDelete(replyID, (err, docs) => {
        if(err) return res.send({status: 400, message: err});
        Post.findByIdAndUpdate(postID, {
            $pull: {replies: replyID}
        }, (err, docs) => {
            if(err) return res.send({status: 400, message: err});
            io.emit(`comment_actions:${postID}`)
            res.send({status: 200, message: "reply has been removed"});
        })
    })
})
app.put("/updateUserProfile/:id", async (req, res) => {
    const userID = req.params.id;
    const data = req.body.info;
    const user = await Users.findById(userID);

    for(let key in data) {
        if(key === "socials") {
            user.info.socials = user.info.socials.map(social => {
                if(social.social === data[key].social) {
                    return social = data[key];
                }
                return social;
            })
        } else {
            user.info[key] = data[key]
        }
        
    }
    
    user.save(err => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, message: "Profile updated"})
    })

})
app.put("/followUser/:id", async (req, res) => {
    const userID = req.params.id;
    const follow = req.body.follow;
    const followUser = await Users.findById(follow);

    if(followUser.settings.notifications.follow) {
        const notification = new Notifications({
            _id: mongoose.Types.ObjectId(),
            user: mongoose.Types.ObjectId(userID),
            messages: {
                message: "follow you",
                link: `/user/${userID}`,
                created: Date.now()
            },
        })
        notification.save();
        followUser.notifications.events.notifications.push(notification._id);
        followUser.notifications.events.unread++;
        followUser.save(err => {
            io.emit(`events_notifications:${follow}`)
        })
    }

    
    
    Users.findByIdAndUpdate(userID, {
        $push: {'info.following': follow}
    }, (err, result) => {
        if(err) return res.send({status: 400, message: err});
        Users.findByIdAndUpdate(follow, {
            $push: {'info.followers': userID},
        }, (err, result) => {
            if(err) return res.send({status: 400, message: err});
            
            res.send({status: 200, message: "User has been followed"})
        })
    })
})
app.put("/unfollowUser/:id", async (req, res) => {
    const userID = req.params.id;
    const unfollow = req.body.unfollow;
    
    Users.findByIdAndUpdate(userID, {
        $pull: {'info.following': unfollow}
    }, (err, result) => {
        if(err) return res.send({status: 400, message: err});
        Users.findByIdAndUpdate(unfollow, {
            $pull: {'info.followers': userID}
        }, (err, result) => {
            if(err) return res.send({status: 400, message: err});
            res.send({status: 200, message: "User has been unfollowed"})
        })
    })
})
app.put("/updatePrivacy/:id", async (req, res) => {
    const userID = req.params.id;
    const privacy = req.body.privacy;

    Users.findByIdAndUpdate(userID, {
        $set: {'settings.privacy': privacy}
    }, (err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, message: "Privacy updated"})
    })
})
app.put("/updateNotifications/:id", (req, res) => {
    const userID = req.params.id;
    const notifications = req.body.notifications;

    Users.findByIdAndUpdate(userID, {
        $set: {'settings.notifications': notifications}
    }, (err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, message: "Notifications updated"})
    })
})
app.put("/changePassword/:id", async (req, res) => {
    const userID = req.params.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const user = await Users.findById(userID);

    if(user.password === oldPassword) {
        user.password = newPassword;
        user.save(err => {
            if(err) return res.send({status: 400, message: err});
            res.send({status: 200, message: "Password changed"})
        })
    } else {
        res.send({status: 200, message: "Previous password doesn't match"})
    }
})
app.delete("/deactivateUser/:id", async (req, res) => {
    const userID = req.params.id;
    const password = req.body.password;
    const user = await Users.findById(userID);

    if(user.password === password) {
        res.send({status: 202})
    } else {
        res.send({status: 200, message: "Password doesn't match"})
    }
})
app.post("/addFavoriteListing/:id", (req, res) => {
    const userID = req.params.id;
    const listingID = req.body.listing;

    Users.findByIdAndUpdate(userID, {
        $push: {'info.savedListings': listingID}
    }, (err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, message: "Listing has been saved"})
    })
})
app.put("/removeFavoriteListing/:id", (req, res) => {
    const userID = req.params.id;
    const listingID = req.body.listing;

    Users.findByIdAndUpdate(userID, {
        $pull: {'info.savedListings': listingID}
    }, (err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, message: "Listing has been unsaved"})
    })
})
app.get("/getNotificationsEvents/:id", (req, res) => {
    const userID = req.params.id;

    Users.findById(userID, "notifications.events").
    populate({
        path: "notifications.events.notifications",
        populate: {
            path: "user",
            select: "info.name info.avatar"
        }
    }).
    exec((err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, notifications: result.notifications})
    })
})
app.put("/readNotificationsEvents/:id", (req, res) => {
    const userID = req.params.id;

    Users.findByIdAndUpdate(userID, {
        'notifications.events.unread': 0
    }, (err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200});
    })
})
app.get("/getNotificationsMessage/:id", (req, res) => {
    const userID = req.params.id;

    Users.findById(userID, "notifications.messages").
    populate({
        path: "notifications.messages.notifications",
        options: {sort: {'messages.created': -1}, limit: 10},
        populate: {
            path: "user",
            select: "info.name info.avatar"
        }
    }).
    exec((err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, notifications: result.notifications})
    })
})
app.put("/readNotificationsMessages/:id", (req, res) => {
    const userID = req.params.id;

    Users.findByIdAndUpdate(userID, {
        'notifications.messages.unread': 0
    }, (err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200});
    })
})
// USERS
app.get("/getUsers", async (req, res) => {
    Users.find({}, "info", (err, users) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, users})
    })
})
app.post("/searchUsers", async (req, res) => {
    const search = req.body.search;
    const options = new RegExp(`^${search}`, "gmi");
    Users.find({"info.name": options }, "info", (err, users) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, users})
    })
})
// LISTINGS
app.post("/listings", (req, res) => {
    const data = req.body;
    let options = {}
    Object.keys(data).map(key => {
        options["event."+ key] = new RegExp(`${data[key]}`, "gmi");
    })
    Listings.find(options).
    populate({
        path: "user",
        select: "info.avatar info.name"
    }).
    exec((err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, result})
    })
})
app.get("/listings/:id", (req, res) => {
    const listingID = req.params.id;

    Listings.findById(listingID).
    populate({
        path: "user",
        select: "info.avatar info.name"
    }).
    exec((err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, result})
    })
})
app.get("/userListings/:id", (req, res) => {
    const userID = req.params.id;

    Users.findById(userID, "info.listings").
    populate({
        path: "info.listings",
        select: "created event.section event.name event.images.logo"
    }).
    exec((err, listings) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, listings: listings.info.listings})
    })
})
app.get("/savedListings/:id", (req, res) => {
    const userID = req.params.id;

    Users.findById(userID, "info.savedListings").
    populate({
        path: "info.savedListings",
        select: "created event.section event.name event.images.logo"
    }).
    exec((err, listings) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, listings: listings.info.savedListings})
    })
})
app.post('/addListing/:id', async (req, res) => {
    const userID = req.params.id;
    const data = req.body.listing;

    const listing = new Listings({
        _id: mongoose.Types.ObjectId(),
        user: mongoose.Types.ObjectId(userID),
        event: data,
        created: Date.now(),
        comments: []
    })

    listing.save(err => {
        if(err) return res.send({status: 400, message: err});
        Users.findByIdAndUpdate(userID, {
            $push: {'info.listings': listing._id}
        }, (err, result) => {
            if(err) return res.send({status: 400, message: err});
            res.send({status: 200, message: "Listing has been added"});
        })
    })
})
app.delete('/removeListing/:id', async (req, res) => {
    const userID = req.params.id;
    const listingID = req.body.listing;
    const listing = await Listings.findById(listingID);

    for(let i = 0; i < listing.comments.length; i++) {
        let comment = await Post.findById(listing.comments[i]);
        PostReplies.deleteMany({_id: {$in: comment.replies}}, err => {
            if(err) return res.send({status: 400, message: err});
        })
        Post.findByIdAndDelete(listing.comments[i], err => {
            if(err) return res.send({status: 400, message: err});
        })
    }

    Listings.findByIdAndDelete(listingID, (err, result) => {
        if(err) return res.send({status: 400, message: err});
        Users.findByIdAndUpdate(userID, {
            $pull: {'info.listings': listingID}
        }, (err, result) => {
            if(err) return res.send({status: 400, message: err});
            res.send({status: 200, message: "Listing has been removed"});
        })
    })
})
app.get('/getListingPosts/:id', (req, res) => {
    const listingID = req.params.id;
    Listings.findById(listingID, "comments").
    populate("comments").
    populate({
        path: "comments",
        populate: {
            path: "user",
            select: "info.name info.avatar"
        }
    }).
    populate({
        path: "comments",
        populate: {
            path: "replies",
            populate: {
                path: "user",
                select: "info.name info.avatar"
            }
        }
    }).
    exec((err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, posts: result.comments});
    })
})
app.post('/addListingPost/:id', async (req, res) => {
    const sender = req.params.id;
    const target = req.body.target;
    const message = req.body.message;
    const receiver = await Listings.findById(target);
    const receiverUser = await Users.findById(receiver.user);

    const post = new Post({
        _id: mongoose.Types.ObjectId(),
        user: mongoose.Types.ObjectId(sender),
        create: Date.now(),
        text: message,
        replies: []
    })
    post.save(err => {
        if(err) return res.send({status: 400, message: err});

        if(receiverUser.settings.notifications.listings) {
            const notification = new Notifications({
                _id: mongoose.Types.ObjectId(),
                user: mongoose.Types.ObjectId(sender),
                messages: {
                    message: "comment your listing",
                    link: `/event/${target}/comments`,
                    created: Date.now()
                },
            })
            notification.save();
            receiverUser.notifications.events.notifications.push(notification._id);
            receiverUser.notifications.events.unread++;
            receiverUser.save(err => {
                io.emit(`events_notifications:${receiver.user}`)
            })
        }
        receiver.comments.push(post._id);
        receiver.save(err => {
            if(err) return res.send({status: 400, message: err});
            io.emit(`listing_post:${target}`)
            res.send({status: 200, message: "post has been added"});
        })
    })
})
app.delete('/removeListingPost/:id', async (req, res) => {
    const listingID = req.params.id;
    const postID = req.body.post;
    const post = await Post.findById(postID);
    
    Listings.findByIdAndUpdate(listingID, {
        $pull: {comments: listingID}
    }, (err, docs) => {
        if(err) return res.send({status: 400, message: err});
        PostReplies.deleteMany({_id: {$in: post.replies}}, err => {
            if(err) return res.send({status: 400, message: err});
        });
        Post.findByIdAndDelete(postID, err => {
            if(err) return res.send({status: 400, message: err});
        });
        io.emit(`listing_post:${listingID}`)
        res.send({status: 200, message: "Post has been deleted"});
    })
})
// DIALOGS
app.post(`/openDialog/:id`, async (req, res) => {
    const userID = req.params.id;
    const target = req.body.target;
    const user1 = await Users.findById(userID);
    const user2 = await Users.findById(target);

    const isDialog = user1.dialogs.filter(id => user2.dialogs.includes(id));
    if(isDialog.length === 0) {
        const dialog = new Dialog({
            _id: mongoose.Types.ObjectId(),
            participants: [mongoose.Types.ObjectId(userID), mongoose.Types.ObjectId(target)],
            messages: []
        })
        dialog.save(err => {
            if(err) return res.send({status: 400, message: err});
            user1.dialogs.push(dialog._id);
            user1.save();
            user2.dialogs.push(dialog._id);
            user2.save();
            res.send({status: 200, dialog: dialog._id})
        })
    } else {
        res.send({status: 200, dialog: isDialog[0]})
    }

})
app.get('/getUserDialogs/:id', async (req, res) => {
    const userID = req.params.id;

    Users.findById(userID, "dialogs").
    populate({
        path: "dialogs",
        populate: {
            path: "participants",
            select: "info.name info.avatar"
        }
    }).
    populate({
        path: "dialogs",
        populate: {
            path: "messages",
            options: {sort: {created: -1}, limit: 1}
        }
    }).
    exec((err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, dialogs: result.dialogs})
    })
})
app.get('/updateUserDialog/:id', async (req, res) => {
    const dialogID = req.params.id;

    Dialog.findById(dialogID).
    populate({
        path: "messages",
        options: {sort: {created: -1}, limit: 1}
    }).
    exec((err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, dialogs: result})
    })
})
app.get('/getDialog/:id', (req, res) => {
    const dialogID = req.params.id;

    Dialog.findById(dialogID).
    populate({
        path: "participants",
        select: "status info.name info.avatar"
    }).
    populate({
        path: "messages",
    }).
    exec((err, result) => {
        if(err) return res.send({status: 400, message: err});
        res.send({status: 200, dialog: result})
    })
})
app.post('/sendMessage/:id', async (req, res) => {
    const sender = req.params.id;
    const dialogID = req.body.dialog;
    const text = req.body.message;
    const dialog = await Dialog.findById(dialogID);

    const receiver = dialog.participants.filter(user => user != sender);

    const message = new Message({
        _id: mongoose.Types.ObjectId(),
        user: mongoose.Types.ObjectId(sender),
        message: text,
        created: Date.now(),
    })
    message.save(err => {
        const notification = new Notifications({
            _id: mongoose.Types.ObjectId(),
            user: mongoose.Types.ObjectId(sender),
            messages: {
                message: text,
                link: "#",
                created: Date.now()
            },
        })
        notification.save(err => {
            Users.findByIdAndUpdate(receiver[0], {
                $push: {'notifications.messages.notifications': notification._id},
                $inc: {'notifications.messages.unread': 1}
            }, (err => {
                if(err) return res.send({status: 400, message: err});
                io.emit(`messages_notifications:${receiver[0]}`)
            }))
        });
        Dialog.findByIdAndUpdate(dialogID, {
            $push: {messages: message._id}
        }, (err, result) => {
            if(err) return res.send({status: 400, message: err});
            io.emit(dialogID);
            res.send({status: 200, dialog: dialogID})
        })
    })
})

http.listen(API_PORT, () => {
    console.log('server is running on port', http.address().port);
  });