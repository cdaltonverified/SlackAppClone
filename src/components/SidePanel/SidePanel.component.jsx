import React from 'react';
import { Menu } from 'semantic-ui-react';
import UserCard from "./UserCard/UserCard.component";

import "./SidePanel.css";

export const SidePanel = () => {
    return (<Menu vertical fixed="left" borderless size="large" className="side_panel">
        { <UserCard />}
    </Menu>
    )
}