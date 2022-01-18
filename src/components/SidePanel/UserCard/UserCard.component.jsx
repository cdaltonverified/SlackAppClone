import React from 'react';
import { connect } from "react-redux";
import firebase from '../../../server/firebase';
import { Grid, Header, Icon, Image, Dropdown } from 'semantic-ui-react';

import "./UserCard.css";

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}

const UserCard = (props) => {

    const logout = () => {
        firebase.auth()
            .signOut()
            .then(() => console.log("Logged out"));
    }

    const getDropDown = () => {
        return [{
            key: 'signout',
            text: <span onClick={ logout } > Logout</span>
        }]
    }

    if (props.user) {
        return (<Grid>
            <Grid.Column>
                <Grid.Row className="user_card_grid_row">
                    <Header inverted as="h2">
                        <Icon name="slack" />
                        <Header.Content>Slack Clone</Header.Content>
                    </Header>
                    <Header className="user_card_displayname" inverted as="h4">
                        <Dropdown
                            trigger={
                                <span>
                                    <Image src={props.user.photoURL} avatar></Image>
                                    {props.user.displayName}
                                </span>
                            }
                            options={getDropDown()}
                        >
                        </Dropdown>

                    </Header>
                </Grid.Row>
            </Grid.Column>
        </Grid>)
    }
    return null;
}

export default connect(mapStateToProps)(UserCard);