import React, { useEffect, useState } from 'react';
import MessageHeader from './ChatHeader/ChatHeader.component';
import MessageContent from "./ChatContent/ChatContent.component";
import MessageInput from "./ChatInput/ChatInput.component";
import { connect } from "react-redux";
import firebase from "../../server/firebase";
import { Segment, Comment } from 'semantic-ui-react';
import "./Chats.css";

const Chats = (props) => {

    const messageRef = firebase.database().ref('messages');

    const [messagesState, setMessagesState] = useState([]);

    useEffect(() => {
        if (props.channel) {
            setMessagesState([]);
            messageRef.child(props.channel.id).on('child_added', (snap) => {
                setMessagesState((currentState) => {
                    let updatedState = [...currentState];
                    updatedState.push(snap.val());
                    return updatedState;
                })
            })

            return () => messageRef.child(props.channel.id).off();
        }
    }, [props.channel])

    const showChats = () => {
        let messagesToDisplay = messagesState;
        if (messagesToDisplay.length > 0) {
            return messagesToDisplay.map((message) => {
                return <MessageContent ownMessage={message.user.id === props.user.uid} key={message.timestamp} message={message} />
            })
        }
    }

    const uniqueusersCount = () => {
        const uniqueUsers = messagesState.reduce((acc, message) => {
            if (!acc.includes(message.user.name)) {
                acc.push(message.user.name);
            }
            return acc;
        }, []);

        return uniqueUsers.length;
    }

    return <div className="messages"><MessageHeader channelName={props.channel?.name} uniqueUsers={uniqueusersCount()} />
        <Segment className="messagecontent">
            <Comment.Group>
                {showChats()}
            </Comment.Group>
        </Segment>
        <MessageInput /></div>
}

const mapStateToProps = (state) => {
    return {
        channel: state.channel.currentChannel,
        user: state.user.currentUser,
    }
}


export default connect(mapStateToProps)(Chats);