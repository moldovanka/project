import React from "react";
import { Container, Row, Col } from 'reactstrap';
import Comment from "../../../../Common/Comment/Comment";

const Activity = props => {
    return(
        <section className="dashboard_sections">
            <Container>
                <Row>
                    <Col xl={12}>
                        <Comment 
                            {...props}
                            target={props.userID}
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Activity;