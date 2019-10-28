import React, {useState, useEffect} from "react";
import { Container, Row, Col } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import Radio from '@material-ui/core/Radio';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LandscapeIcon from '@material-ui/icons/Landscape';
import { withStyles, FormControlLabel, InputLabel, FormControl, Input, InputAdornment, IconButton } from "@material-ui/core";
import styles from "./Registration.module.css";

const Registration = props => {
    const [showPassword, toggleShowPassword] = useState(false);
    const CustomRadio = withStyles({
        root: {
            color: "#343434",
            "&$checked": {
                color: "#fa2276"
            }
        },
        checked: {}
    })(props => <Radio color="default" {...props} />)
    const CustomInputLabel = withStyles({
        root: {
            color: "#bdc3d3",
            fontSize: "14px",
            "&$focused": {
                fontSize: "16px",
                color: "#434f74"
            }
        },
        focused: {}
    })(props => <InputLabel {...props} />)
        const CustomInput = withStyles({
        input: {
            color: "#bdc3d3",
            fontWeight: "400",
            fontSize: "12px",
        },
        underline: {
            "&:hover:not(.Mui-disabled):before": {
                borderBottom: "1px solid #fa2276",
            },
            "&:before": {
                borderBottom: "1px solid #343434",
            },
            "&:after": {
                borderBottom: "2px solid #fa2276"
            }
        }
    })(props => <Input {...props}/>)
    const CustomIconButton = withStyles({
        root: {
            color: "#bdc3d3",
            "&:focus": {
                outline: "none"
            }
        }
    })(props => <IconButton {...props} />)
    return(
        <section className={styles.box_container}>
            <Container>
                <Row>
                    <Col md={12}>
                    <div className={styles.box_content}>
                            <div className={styles.header}>
                                <div>
                                    <Link to="/">
                                        <img src="https://i.ibb.co/W64Yc3W/Moldovanka.png" alt="logo"></img>
                                    </Link>
                                </div>
                                <div className={styles.login_link}>
                                    <p>Have an already account! - <Link to="/login"> Sign in here</Link></p>
                                </div>
                            </div>
                            <div className={styles.body}>
                                <h1>Sign Up</h1>
                                <p>Hello there! Sign up and start managing your item.</p>
                                <Row>
                                    <Col lg={4} md={6} sm={8} xs={10} style={{margin: "0 auto"}}>
                                        <Formik
                                            initialValues={{
                                                name: "",
                                                gender: "male",
                                                country: "",
                                                email: "",
                                                password: ""
                                            }}
                                            onSubmit={values => {
                                                props.registration(values);
                                            }}
                                            render={propsform => (
                                                <form onSubmit={propsform.handleSubmit} className={styles.form_registration}>
                                                    <div className={styles.form_input_wrapper}>
                                                        <FormControl
                                                            classes={{root: styles.form_control}}>
                                                            <CustomInputLabel htmlFor="name">Name</CustomInputLabel>
                                                            <CustomInput 
                                                                id="name"
                                                                type="text"
                                                                value={propsform.values.name}
                                                                onChange={propsform.handleChange}
                                                                required
                                                                endAdornment={
                                                                    <InputAdornment position="end" classes={{root: styles.adornment}}>
                                                                        <CustomIconButton 
                                                                        >
                                                                           <PersonIcon className={styles.icon}/>
                                                                        </CustomIconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <div style={{position: "relative"}}>
                                                        <p className={styles.gender}>Select Gender</p>
                                                        <div style={{textAlign: "left"}}>
                                                            <FormControlLabel
                                                                control={<CustomRadio
                                                                            checked={propsform.values.gender === "male"}
                                                                            name="gender"
                                                                            value="male"
                                                                            onChange={e => propsform.setFieldValue("gender", e.currentTarget.value)}
                                                                        />} 
                                                                label="Male"
                                                                labelPlacement="end"
                                                                classes={{label: styles.label}}
                                                            />
                                                            <FormControlLabel
                                                                control={<CustomRadio
                                                                            checked={propsform.values.gender === "female"}
                                                                            name="gender"
                                                                            value="female"
                                                                            onChange={e => propsform.setFieldValue("gender", e.currentTarget.value)}
                                                                        />} 
                                                                label="Female"
                                                                labelPlacement="end"
                                                                classes={{label: styles.label}}
                                                            />
                                                            
                                                        </div>
                                                        
                                                    </div>
                                                    <div className={styles.form_input_wrapper}>
                                                        <FormControl
                                                            classes={{root: styles.form_control}}>
                                                            <CustomInputLabel htmlFor="country">Country</CustomInputLabel>
                                                            <CustomInput 
                                                                id="country"
                                                                type="text"
                                                                value={propsform.values.country}
                                                                onChange={propsform.handleChange}
                                                                required
                                                                endAdornment={
                                                                    <InputAdornment position="end" classes={{root: styles.adornment}}>
                                                                        <CustomIconButton 
                                                                        >
                                                                           <LandscapeIcon className={styles.icon}/>
                                                                        </CustomIconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <div className={styles.form_input_wrapper}>
                                                        <FormControl
                                                            classes={{root: styles.form_control}}>
                                                            <CustomInputLabel htmlFor="email">E-mail</CustomInputLabel>
                                                            <CustomInput 
                                                                id="email"
                                                                type="email"
                                                                error={props.setError.error}
                                                                value={propsform.values.email}
                                                                onChange={propsform.handleChange}
                                                                required
                                                                endAdornment={
                                                                    <InputAdornment position="end" classes={{root: styles.adornment}}>
                                                                        <CustomIconButton
                                                                        >
                                                                            <EmailIcon className={styles.icon}/>
                                                                        </CustomIconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                            {props.setError.error && <span className={styles.email_error}>{props.setError.message}</span>}
                                                        </FormControl>
                                                    </div>
                                                    <div className={styles.form_input_wrapper}>
                                                        <FormControl
                                                            classes={{root: styles.form_control}}>
                                                            <CustomInputLabel htmlFor="password">Password</CustomInputLabel>
                                                            <CustomInput 
                                                                id="password"
                                                                type={showPassword ? "text" : "password"}
                                                                value={propsform.values.password}
                                                                onChange={propsform.handleChange}
                                                                required
                                                                endAdornment={
                                                                    <InputAdornment position="end" classes={{root: styles.adornment}}>
                                                                        <CustomIconButton 
                                                                            onClick={() => toggleShowPassword(!showPassword)}
                                                                        >
                                                                            {showPassword ? <Visibility className={styles.icon}/> : <VisibilityOff className={styles.icon}/>}
                                                                        </CustomIconButton>
                                                                    </InputAdornment>
                                                                }
                                                            />
                                                        </FormControl>
                                                    </div>
                                                    <button type="submit" className={styles.btn}>Sign Up</button>
                                                </form>
                                            )}
                                        >
                                        </Formik>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Registration;