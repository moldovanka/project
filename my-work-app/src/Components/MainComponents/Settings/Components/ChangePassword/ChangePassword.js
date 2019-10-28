import React, {useEffect} from "react";
import "./ChangePassword.css";
import { Row, Col } from 'reactstrap';
import { Formik } from "formik";
import { TextField, withStyles } from "@material-ui/core";
import NotificationMessage from "../../../Common/NotificationMessage";

const ChangePassword = props => {
    useEffect(() => {
        if(props.notification !== "") {
            setTimeout(() => {
                props.setNotification("");
            }, 5000)
        }
    }, [props.notification])
    const CssTextField = withStyles({
        root: {
            width: "100%",
            "& label": {
                color: "#bdc3d3",
                fontSize: "14px",
                fontWeight: "400"
            },
            "& .MuiInputBase-root": {
                color: "#bdc3d3",
                fontSize: "12px",
                fontWeight: "400",
                marginBottom: "7px"
            },
          '& label.Mui-focused': {
            color: '#fa2276',
          },
          "& .MuiInput-underline": {
            "&:hover:not(.Mui-disabled):before": {
                borderBottom: "2px solid #343434"
            }  
          },
          "& .MuiInput-underline:before": {
                borderBottom: "1px solid #343434",
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#fa2276',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'red',
            },
            '&:hover fieldset': {
              borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'green',
            },
          },
        },
      })(TextField);
    return(
        <section className="dashboard_sections">
            <Formik
                initialValues={{
                    oldpassword: "",
                    newpassword: "",
                }}
                onSubmit={values => {
                    props.changePassword(values.oldpassword, values.newpassword);
                }}
                render={propsform => (
                    <Row>
                        <Col md={12}>
                            <form onSubmit={propsform.handleSubmit} className="change_password_form">
                                <div className="change_password_form_header">
                                    <p>Change Password</p>
                                </div>
                                <div className="change_password_input_box">
                                    <CssTextField label="Old Password" name="oldpassword" value={propsform.values.oldpassword} onChange={propsform.handleChange} />
                                </div>
                                <div className="change_password_input_box">
                                    <CssTextField label="New Password" name="newpassword" value={propsform.values.newpassword} onChange={propsform.handleChange}/>
                                </div>
                                <div className="change_password_input_box">
                                    <button type="submit" className="change_password_btn">Save Changes</button>
                                    {props.notification !== "" && <NotificationMessage message={props.notification} />}
                                </div>
                            </form>
                        </Col>
                    </Row>
                )}
            >
                
            </Formik>
        </section>
    )
}

export default ChangePassword;