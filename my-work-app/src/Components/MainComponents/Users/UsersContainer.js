import React, { useEffect, useState } from 'react';
import Users from './Users';
import { connect } from 'react-redux';
import { otherAPI } from '../../../api/api';
import { followUser, unfollowUser } from '../../../redux/user-reducer';

const UsersContainer = props => {
    const [users, setUsers] = useState(undefined);
    const [search, setSearch] = useState("");
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    useEffect(() => {
        otherAPI.searchUsers(search)
            .then(res => {
                if(res.data.status === 200) {
                    setUsers(res.data.users);
                }
            })
    }, [props.myFollowing, search])
    return(
        <section>
            <Users 
                users={users}
                search={setSearch}
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

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
