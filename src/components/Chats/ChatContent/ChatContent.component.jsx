import React from 'react';
import { Comment } from "semantic-ui-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

import "./ChatContent.css";

TimeAgo.locale(en);

const timeAgo = new TimeAgo();

const ChatContent = (props) => {
    return <Comment>
        <Comment.Avatar src={props.message.user.avatar} />
        <Comment.Content className={props.ownMessage ? "myMessage" : null}>
            <Comment.Author as="a">{props.message.user.name}</Comment.Author>
            <Comment.Metadata>{timeAgo.format(props.message.timestamp)}</Comment.Metadata>
            <Comment.Text>{props.message.content}</Comment.Text>
        </Comment.Content>
    </Comment>
}

export default ChatContent;