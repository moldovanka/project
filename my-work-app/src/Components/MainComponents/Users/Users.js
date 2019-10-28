import React from "react";
import "./Users.css";
import { Container, Row, Col } from 'reactstrap';
import { Formik } from 'formik';
import NotFoundItem from '../../NotFoundItem';
import Preloader from '../../../Preloader';
import UserCard from "./UserCard";

const Users = props => {
    return (
        <section>
            <Container>
                <Row>
                    <Col xl={12}>
                        <div className="users_header">
                            <h3>Find Users</h3>
                            <div className="users_header_deliver"></div>
                        </div>
                    </Col>
                    <Col xl={12}>
                        <Formik
                            initialValues={{
                                search: ""
                            }}
                            onSubmit={values => {
                                props.search(values.search);
                            }}
                            render={props => (
                                <form onSubmit={props.handleSubmit} className="users_form_search">
                                    <input
                                        type="text"
                                        name="search"
                                        value={props.values.users}
                                        onChange={props.handleChange}
                                        placeholder="Search peoples..."
                                    ></input>
                                    <button type="submit">Search</button>
                                </form>
                            )}
                        >
                        </Formik>
                    </Col>
                </Row>
                <Row>
                    {props.users ? (
                        props.users.length === 0 ? (
                            <NotFoundItem />
                        ) : (
                            props.users.map(user => {
                                if(user._id === props.currentUserID) {
                                    return;
                                }
                                return (
                                    <UserCard
                                        key={user._id} 
                                        {...user}
                                        {...props}
                                    />
                                )
                            })
                        )
                    ) : (
                        <Preloader />
                    )}
                </Row>
            </Container>
        </section>
    )
}

export default Users;