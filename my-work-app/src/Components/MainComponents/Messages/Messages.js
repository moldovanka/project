import React from "react";
import { Container, Row, Col } from 'reactstrap';
import MessagesDialogUsers from './Components/MessagesDialogUsers/MessagesDialogUsers';
import MessagesDialogChatContainer from './Components/MessagesDialogChat/MessagesDialogChatContainer';

const Messages = props => {
    return (
        <section>
            <Container>
                <Row> 
                    <Col sm={12} md={5} lg={4}>
                        <MessagesDialogUsers 
                            currentUser={props.currentUser}
                            dialogs={props.dialogs}
                            searchDialogs={props.searchDialogs}
                        />
                    </Col> 
                    <Col sm={12} md={7} lg={8}>
                        <MessagesDialogChatContainer
                            currentUser={props.currentUser}
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Messages;