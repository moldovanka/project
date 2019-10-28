import * as axios from "axios";
import { SERVER_URL } from "../assets/Server_URL";

const instance = axios.create({
    baseURL: `${SERVER_URL}`
})


export const imageAPI = {
    uploadImage(image) {
        const obj = new FormData();
        obj.append('key', "88f1abeb82ee95e78eddaf3dea78aaaf ");
        obj.append('image', image);
        
        return instance.post("https://api.imgbb.com/1/upload", obj, {
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })
    }
}
export const listingAPI = {
    getListings(params) {
        return instance.post("/listings", params);
    },
    getListing(listing) {
        return instance.get(`/listings/${listing}`);
    },
    getUserListings(user) {
        return instance.get(`/userListings/${user}`);
    },
    getUserSavedListings(user) {
        return instance.get(`/savedListings/${user}`);
    },
    addListing(user, listing) {
        return instance.post(`/addListing/${user}`, {listing});
    },
    removeListing(user, listing) {
        return instance.delete(`/removeListing/${user}`, {data: {listing}});
    },
    getListingPosts(listing) {
        return instance.get(`/getListingPosts/${listing}`)
    },
    addPost(user, target, message) {
        return instance.post(`/addListingPost/${user}`, {target, message});
    },
    removePost(listing, post) {
        return instance.delete(`/removeListingPost/${listing}`, {data: {post}})
    },
}

export const authAPI = {
    register(user) {
        return instance.post("/registration", user);
    },
    login(user) {
        return instance.post("/login", user);
    },
    auth(user) {
        return instance.put(`/auth/${user}`);
    },
    logout(user) {
        return instance.put(`/logout/${user}`)
    }
}

export const userAPI = {
    getUserData(user) {
        return instance.get(`/user/${user}`)
    },
    avatarUpdate(user, avatar) {
        return instance.post(`/avatarUpdate/${user}`, {avatar})
    },
    addPost(user, target, message) {
        return instance.post(`/addUserPost/${user}`, {target, message})
    },
    removePost(user, post) {
        return instance.delete(`/removeUserPost/${user}`, {data: {post}})
    },
    getUserPosts(user) {
        return instance.get(`/getUserPosts/${user}`)
    },
    getUserPostsReply(post) {
        return instance.get(`/getUserPostsReplies/${post}`)
    },
    addPostReply(user, post, message) {
        return instance.put(`/addUserPostReply/${user}`, {post, message})
    },
    removePostReply(post, reply) {
        return instance.put('/removeUserPostReply', {post, reply});
    },
    updateUserProfile(user, info) {
        return instance.put(`/updateUserProfile/${user}`, {info});
    },
    follow(user, follow) {
        return instance.put(`/followUser/${user}`, {follow})
    },
    unfollow(user, unfollow) {
        return instance.put(`/unfollowUser/${user}`, {unfollow})
    },
    updatePrivacy(user, privacy) {
        return instance.put(`/updatePrivacy/${user}`, {privacy});
    },
    updateNotifications(user, notifications) {
        return instance.put(`/updateNotifications/${user}`, {notifications});
    },
    updatePassword(user, oldPassword, newPassword) {
        return instance.put(`/changePassword/${user}`, {oldPassword, newPassword});
    },
    deactivateAccount(user, password) {
        return instance.delete(`/deactivateUser/${user}`, {data: {password}});
    },
    addFavoriteListing(user, listing) {
        return instance.post(`/addFavoriteListing/${user}`, {listing})
    },
    removeFavoriteListing(user, listing) {
        return instance.put(`/removeFavoriteListing/${user}`, {listing})
    }
}

export const dialogAPI = {
    openDialog(user, target) {
        return instance.post(`/openDialog/${user}`, {target})
    },
    getUserDialog(user) {
        return instance.get(`/getUserDialogs/${user}`)
    },
    getDialog(dialog) {
        return instance.get(`/getDialog/${dialog}`)
    },
    sendMessage(user, dialog, message) {
        return instance.post(`/sendMessage/${user}`, {dialog, message})
    },
    updateUserDialog(dialog) {
        return instance.get(`/updateUserDialog/${dialog}`);
    }
}

export const otherAPI = {
    getUsers() {
        return instance.get("/getUsers");
    },
    searchUsers(search) {
        return instance.post("/searchUsers", {search})
    },
    getNotificationsEvents(user) {
        return instance.get(`/getNotificationsEvents/${user}`);
    },
    readNotificationsEvents(user) {
        return instance.put(`/readNotificationsEvents/${user}`)
    },
    getNotificationsMessages(user) {
        return instance.get(`/getNotificationsMessage/${user}`);
    },
    readNotificationsMessages(user) {
        return instance.put(`/readNotificationsMessages/${user}`)
    }
}