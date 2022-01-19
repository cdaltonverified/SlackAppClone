import React from 'react';
import { Menu } from 'semantic-ui-react';
import Channel from "./Channel/Channel.component";
import UserCard from "./UserCard/UserCard.component";

import "./SidePanel.css";

export const SidePanel = () => {
    return (<Menu vertical fixed="left" borderless size="large" className="side_panel">
        <UserCard />
        <Channel />
    </Menu>
    )
}