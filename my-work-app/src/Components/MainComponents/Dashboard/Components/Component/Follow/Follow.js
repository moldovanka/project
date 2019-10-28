import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Row, Col } from 'reactstrap';
import NotFoundItem from "../../../../../NotFoundItem";
import Preloader from "../../../../../../Preloader";
import UserCard from "../../../../Users/UserCard";

const useFollowStyle = makeStyles(theme => ({
    title: {
        fontSize: "24px",
        color: "#fff",
        fontWeight: "500"
    }
}))

const Follow = props => {
    
    const classes = useFollowStyle();
    return (
        <section className="dashboard_sections">
            <Container>
                <Row>
                    <Col md={12}>
                        <h3 className={classes.title}>{props.title}</h3>
                    </Col>
                </Row>
                <Row>
                    {props.users ? (
                        props.users.length === 0 ? (
                            <NotFoundItem />
                        ) : (
                            props.users.map(user => {
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
export default Follow;