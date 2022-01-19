import React from 'react';
import { Segment, Header, Icon } from 'semantic-ui-react';

const ChatHeader = (props) => {
    return <Segment clearing>
        <Header floated="left" fluid="true" as="h2">
            <span>
                {(props.isPrivateChat ? "@ " : "# ") + props.channelName}
            </span>
            <Header.Subheader> {props.uniqueUsers} User{props.uniqueUsers === 1 ? "" : "s"}</Header.Subheader>
        </Header>
    </Segment>
}

export default ChatHeader;