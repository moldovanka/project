import React, { useState } from "react";
import "./ChangeUserDetails.css";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'reactstrap';
import { Formik } from "formik";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { Radio, FormControlLabel } from "@material-ui/core";
import ChangeUserDetailsItem from './ChangeUserDetailsItem';
import NotificationMessage from "../../../../Common/NotificationMessage";

const useAccountDetailStyle = makeStyles(theme => ({
    social_list: {
        display: props => props.showSocialList ? "block" : "none",
    },
    coordinates: {
        fontSize: "14px",
    },
}));


const ChangeUserDetails = props => {
    React.useEffect(() => {
        if(props.notification) {
            setTimeout(() => {
                props.clearNotification(undefined);
            }, 5000)
        }
    }, [props.notification])
    const CustomRadio = withStyles({
        colorPrimary: {
            color: "#fa2276",
            "&$checked": {
                color: "#fa2276",
            }
        },
        checked: {}
    })(props => <Radio {...props}/>)
    const [showSocialList, setShowSocialList] = useState(false);
    const [social, setSocial] = useState("")
    const [location, setLocation] = useState(null);
    const classes = useAccountDetailStyle({showSocialList});
    function socialSet(e, setField) {
        const value = e.currentTarget.innerText;
        setField("socials.social", value.toLowerCase());
        setSocial(value);
        setShowSocialList(!showSocialList)
    }
    const setGEO = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pickCoordinates)
        }
    }
    function pickCoordinates(position) {
        const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        setLocation(location)
    }
    return (
        <section className="dashboard_sections">
            <Container>
                <Formik
                    enableReinitialize={true}
                    initialValues={{
                        name: props.name,
                        about: props.about,
                        address: props.address,
                        phone: props.phone,
                        website: props.website,
                        country: props.country,
                        region: props.region
                    }}
                    onSubmit={values => {
                        if(location) {
                            values["location"] = location;
                        }
                        props.updateProfile(values);
                    }}
                    render={propsForm => (
                        <form onSubmit={propsForm.handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <ChangeUserDetailsItem settingName="Name">
                                        <input 
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            value={propsForm.values.name}
                                            onChange={propsForm.handleChange}
                                        />
                                    </ChangeUserDetailsItem>
                                    <ChangeUserDetailsItem settingName="Description">
                                        <textarea 
                                            name="about"
                                            placeholder="Write feedback here"
                                            value={propsForm.values.about}
                                            onChange={propsForm.handleChange}
                                        />
                                    </ChangeUserDetailsItem>
                                    <ChangeUserDetailsItem settingName="Social Network Accounts">
                                        <Row>
                                            <Col xl={6}>
                                                <div style={{position: "relative"}}>
                                                    <input
                                                        name="social" 
                                                        type="text"
                                                        placeholder="Social Accounts"
                                                        style={{cursor: "pointer"}}
                                                        onClick={() => setShowSocialList(!showSocialList)}
                                                        value={social}
                                                        readOnly
                                                    />
                                                    {showSocialList ? <ArrowDropUpIcon className="change_details_social_list_icon" /> : <ArrowDropDownIcon className="change_details_social_list_icon" />}
                                                    <div className={`change_details_social_list ${classes.social_list}`}>
                                                        <div onClick={e => socialSet(e, propsForm.setFieldValue)}>Facebook</div>
                                                        <div onClick={e => socialSet(e, propsForm.setFieldValue)}>Twitter</div>
                                                        <div onClick={e => socialSet(e, propsForm.setFieldValue)}>Instagram</div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xl={6}>
                                                <input
                                                    name="social_url" 
                                                    type="text"
                                                    placeholder="URL"
                                                    onChange={e => propsForm.setFieldValue("socials.url", e.currentTarget.value)}
                                                />
                                            </Col>
                                        </Row>
                                    </ChangeUserDetailsItem>
                                    <ChangeUserDetailsItem settingName="Address">
                                        <input 
                                            name="address"
                                            type="text"
                                            placeholder="Enter your address"
                                            value={propsForm.values.address}
                                            onChange={propsForm.handleChange}
                                        />
                                    </ChangeUserDetailsItem>
                                </Col>
                                <Col md={6}>
                                    <ChangeUserDetailsItem settingName="Phone Number">
                                        <input
                                            name="phone" 
                                            type="text"
                                            placeholder="Phone number"
                                            value={propsForm.values.phone}
                                            onChange={propsForm.handleChange}
                                        />
                                    </ChangeUserDetailsItem>
                                    <ChangeUserDetailsItem settingName="Website">
                                        <input
                                            name="website" 
                                            type="text"
                                            placeholder="www.yourwebsite.com"
                                            className="change_details_input"
                                            value={propsForm.values.website}
                                            onChange={propsForm.handleChange}
                                        />
                                    </ChangeUserDetailsItem>
                                    <ChangeUserDetailsItem settingName="Country and Region">
                                        <FormControlLabel
                                            control={<CustomRadio color="primary" />}
                                            label="Pick coordinates"
                                            labelPlacement="end"
                                            classes={{
                                                label: classes.coordinates,
                                            }}
                                            checked={location}
                                            onClick={() => setGEO()}
                                        />
                                        <input
                                            name="country" 
                                            type="text"
                                            placeholder="Country"
                                            value={propsForm.values.country}
                                            onChange={propsForm.handleChange}
                                        />
                                        <input
                                            name="region" 
                                            type="text"
                                            placeholder="Region"
                                            value={propsForm.values.region}
                                            onChange={propsForm.handleChange}
                                        />
                                    </ChangeUserDetailsItem>
                                </Col>
                                <Col md={12}>
                                    <button type="submit" className="change_details_btn">Save Now</button>
                                    {props.notification && <NotificationMessage message={props.notification} />}
                                </Col>
                            </Row>
                        </form>
                    )}
                >

                </Formik>
            </Container>
        </section>
    )
}

export default ChangeUserDetails;