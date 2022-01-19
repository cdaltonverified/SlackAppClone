import React from 'react';
import { SidePanel } from "./components/SidePanel/SidePanel.component";
import Chats from "./components/Chats/Chats.component";
import { Grid } from 'semantic-ui-react';

import './App.css';

function App() {
  return (
    <Grid columns="equal">
      <SidePanel />
      <Grid.Column className="chat_panel">
        <Chats />
      </Grid.Column>
      <Grid.Column width={3}>
        <span>

        </span>
      </Grid.Column>
    </Grid>

  );
}

export default App;
