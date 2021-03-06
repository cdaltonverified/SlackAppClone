import React, { useState } from 'react';
import { Segment, Input, Button } from "semantic-ui-react";
import firebase from "../../../server/firebase";
import { connect } from "react-redux";

const ChatInput = (props) => {

    const messageRef = firebase.database().ref('messages');

    const [messageState, setMessageState] = useState("");

    const createMessageInfo = () => {
        return {
            user: {
                avatar: props.user.photoURL,
                name: props.user.displayName,
                id: props.user.uid
            },
            content: messageState,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }
    }

    const submitForm = () => {
        if (messageState) {
            messageRef.child(props.channel.id)
                .push()
                .set(createMessageInfo())
                .then(() => setMessageState(""))
                .catch((firebaseError) => console.log(firebaseError))
        }
    }

    const onMessageChange = (e) => {
        const target = e.target;
        setMessageState(target.value);
    }

    const createActionButtons = () => {
        return <>
            <Button icon="send" onClick={() => { submitForm() }} />
        </>
    }

    return <Segment>
        <Input
            onChange={onMessageChange}
            fluid={true}
            name="message"
            value={messageState}
            label={createActionButtons()}
            labelPosition="right"
        />
    </Segment>
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}

export default connect(mapStateToProps)(ChatInput);