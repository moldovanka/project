import React, {useEffect} from "react";
import { Switch, Route } from 'react-router-dom';
import AddListings from "./AddListings";
import AddPlace from "./Components/AddPlace/AddPlace";
import AddEvent from "./Components/AddEvent/AddEvent";
import AddEstate from "./Components/AddEstate/AddEstate";
import AddVehicles from "./Components/AddVehicles/AddVehicles";
import AddElectronics from "./Components/AddElectronics/AddElectronics";
import AddOthers from './Components/AddOthers/AddOthers';
import { connect } from 'react-redux';
import { addListing, isUploadingAC } from './../../../redux/events-reducer';
import AddListingsSuccess from "./Components/AddListingsSuccess";


const AddListingsContainer = props => {
    useEffect(() => {
        window.scrollTo(0,0);
    }, [])
    return (
        <section>
            {props.isUploading ? (
                <AddListingsSuccess uploadingStatus={props.uploadingStatus}/>
            ) : (
                <Switch>
                    <Route exact path={`${props.match.url}`} render={() => <AddListings {...props}/> }/>
                    <Route path={`${props.match.url}/place`} render={() => <AddPlace {...props}/> }/>
                    <Route path={`${props.match.url}/event`} render={() => <AddEvent {...props}/> }/>
                    <Route path={`${props.match.url}/estate`} render={() => <AddEstate {...props}/> }/>
                    <Route path={`${props.match.url}/vehicle`} render={() => <AddVehicles {...props}/> }/>
                    <Route path={`${props.match.url}/electronic`} render={() => <AddElectronics {...props}/> }/>
                    <Route path={`${props.match.url}/other`} render={() => <AddOthers {...props}/> }/>
                </Switch>
            )}
            
        </section>
    )
}
let mapStateToProps = state => {
    return {
        isUploading: state.eventsReducer.uploading
    }
}
let mapDispatchToProps = dispatch => {
    return {
        addListing: data => dispatch(addListing(data)),
        uploadingStatus: () => dispatch(isUploadingAC()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddListingsContainer);