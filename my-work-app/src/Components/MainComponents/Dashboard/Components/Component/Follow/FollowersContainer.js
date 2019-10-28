import React, {useState, useEffect} from "react";
import { connect } from 'react-redux';
import Follow from "./Follow";
import { otherAPI } from "../../../../../../api/api";
import { followUser, unfollowUser } from "../../../../../../redux/user-reducer";

const FollowersContainer = props => {
    const [users, setUsers] = useState(undefined);
    useEffect(() => {
        otherAPI.getUsers()
            .then(res => {
                if(res.data.status === 200) {
                    let result = res.data.users.filter(user => user.info.following.includes(props.userID));
                    setUsers(result);
                }
            })
    }, [props.myFollowing])
    return (
        <section className="dashboard_sections">
            <Follow
                users={users}
                {...props}
            />
        </section>
    )
}

let mapStateToProps = state => {
    return {
        currentUserID: state.userReducer._id,
        myFollowing: state.userReducer.info.following
    }
}

let mapDispatchToProps = dispatch => {
    return {
        follow: follow => dispatch(followUser(follow)),
        unfollow: unfollow => dispatch(unfollowUser(unfollow)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FollowersContainer)