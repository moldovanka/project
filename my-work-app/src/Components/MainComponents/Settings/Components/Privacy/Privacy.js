import React, {useState, useEffect} from "react";
import "./Privacy.css";
import { Row, Col } from 'reactstrap';
import { makeStyles } from "@material-ui/styles";
import { FormControlLabel, RadioGroup } from '@material-ui/core';
import { Radio } from '@material-ui/core';
import { Formik } from 'formik';
import NotificationMessage from "../../../Common/NotificationMessage";
const usePrivacyStyles = makeStyles(theme => ({
    radio_root: {
        color: "#fa2276",
        "&.MuiRadio-colorPrimary.Mui-checked": {
            color: "#fa2276"
        }
    },
    radio_label: {
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "24px",
        cursor: "pointer",
        color: "#bdc3d3" 
    },
}))

const Privacy = props => {
    const classes = usePrivacyStyles();
    const [collapse, setCollapse] = useState(null);
    useEffect(() => {
        if(props.notification !== "") {
            setTimeout(() => {
                props.setNotification("");
            }, 5000)
        }
    }, [props.notification])
    const handletoggle = e => {
        let value = e.currentTarget.dataset.value;
        if(value === collapse) {
            setCollapse(null);
        } else {
            setCollapse(value);
        }
    }
    return(
        <section className="dashboard_sections">
            <Formik 
                initialValues={{
                    email: props.settings.email,
                    friends: props.settings.friends
                }}
                onSubmit={values => {
                    props.updatePrivacy(values)
                }}
                render={propsform => (
                    <form onSubmit={propsform.handleSubmit}> 
                        <Row>
                            <Col md={12}>
                                <div className="privacy_accordion">
                                    <div>
                                        <p className="privacy_item_header" data-value={0} onClick={handletoggle}>
                                            Who can see your email address
                                        </p>
                                        <div className={`privacy_item_body ${collapse == 0 ? "show" : ""}`}>
                                            <p>Choose who can see your email address on your profile</p>
                                            <div className={classes.radio_btn}>
                                                <RadioGroup 
                                                    value={propsform.values.email} 
                                                    onChange={e => propsform.setFieldValue("email", e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value="everyone"
                                                        control={<Radio color="primary" className={classes.radio_root} />}
                                                        label="Everyone"
                                                        labelPlacement="end"
                                                        classes={{label: classes.radio_label}}
                                                    />
                                                    <FormControlLabel
                                                        value="friends"
                                                        control={<Radio color="primary" className={classes.radio_root} />}
                                                        label="Friends"
                                                        labelPlacement="end"
                                                        classes={{label: classes.radio_label}}
                                                    />
                                                    <FormControlLabel
                                                        value="me"
                                                        control={<Radio color="primary" className={classes.radio_root} />}
                                                        label="Only me"
                                                        labelPlacement="end"
                                                        classes={{label: classes.radio_label}}
                                                    />
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="privacy_item_header" data-value={1} onClick={handletoggle}>
                                            Who can see your Friends
                                        </p>
                                        <div className={`privacy_item_body ${collapse == 1 ? "show" : ""}`}>
                                            <p>Choose who can see your friends on your profile</p>
                                            <div className={classes.radio_btn}>
                                                <RadioGroup 
                                                    value={propsform.values.friends} 
                                                    onChange={e => propsform.setFieldValue("friends", e.target.value)}
                                                >
                                                    <FormControlLabel
                                                        value="everyone"
                                                        control={<Radio color="primary" className={classes.radio_root} />}
                                                        label="Everyone"
                                                        labelPlacement="end"
                                                        classes={{label: classes.radio_label}}
                                                    />
                                                    <FormControlLabel
                                                        value="friends"
                                                        control={<Radio color="primary" className={classes.radio_root} />}
                                                        label="Friends"
                                                        labelPlacement="end"
                                                        classes={{label: classes.radio_label}}
                                                    />
                                                    <FormControlLabel
                                                        value="me"
                                                        control={<Radio color="primary" className={classes.radio_root} />}
                                                        label="Only me"
                                                        labelPlacement="end"
                                                        classes={{label: classes.radio_label}}
                                                    />
                                                </RadioGroup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="privacy_btn">Save Changes</button>
                                {props.notification !== "" && <NotificationMessage message={props.notification} />}
                            </Col>
                        </Row>
                    </form>
                )}
            >

            </Formik>
        </section>
    )
}

export default Privacy;