import React, {useState, useEffect} from "react";
import ListingInfo from "./ListingInfo";
import { listingAPI } from "../../../api/api";
import { connect } from 'react-redux';
import { openDialog } from "../../../redux/dialog-reducer";
import { Redirect } from 'react-router-dom';

const ListingInfoContainer = props => {
    const [listing, setListing] = useState(undefined);
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    useEffect(() => {
        listingAPI.getListing(props.match.params.id)
            .then(res => {
                if(res.data.status === 200) {
                    setListing(res.data.result);
                }
            })
    }, [])
    return (
        <section>
            {props.openDialog && <Redirect to="/messages" />}
            <ListingInfo 
                listing={listing}
                {...props}
                createDialog={props.createDialog}
            />
        </section>
    )
}
let mapStateToProps = state => {
    return {
        currentUserID: state.userReducer._id,
        openDialog: state.dialogReducer.openDialog
    }
}
let mapDispatchToProps = dispatch => {
    return {
        createDialog: target => dispatch(openDialog(target))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListingInfoContainer);