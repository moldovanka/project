import React, {useEffect} from "react";
import "./DeactivateAccount.css";
import { Row, Col } from 'reactstrap';
import { Formik } from "formik";
import { TextField, withStyles } from "@material-ui/core";
import NotificationMessage from "../../../Common/NotificationMessage";
const DeactivateAccount = props => {
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
                    password: "",
                }}
                onSubmit={values => {
                    props.deactivateAccount(values.password)
                }}
                render={propsForm => (
                    <Row>
                        <Col md={12}>
                            <form onSubmit={propsForm.handleSubmit} className="deactivate_account_form">
                                <div className="deactivate_account_form_header">
                                    <p>Deactivate Account</p>
                                </div>
                                <div className="deactivate_account_input_box">
                                    <CssTextField label="Enter your password" name="password" value={propsForm.values.password} onChange={propsForm.handleChange} />
                                </div>
                                <div className="deactivate_account_input_box">
                                    <button type="submit" className="deactivate_account_btn">Deactivate Now</button>
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

export default DeactivateAccount;