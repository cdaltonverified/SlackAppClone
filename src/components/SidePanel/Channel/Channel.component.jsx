import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import firebase from "../../../server/firebase";
import { setChannel } from "../../../storage/actioncreator"

import './Channel.css';
import { Menu, Icon, Modal, Button, Form, Segment } from 'semantic-ui-react';

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser,
        channel: state.channel.currentChannel
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectChannel: (channel) => dispatch(setChannel(channel))
    }
}

const Channel = (props) => {
    const [channelAddState, setChannelAddState] = useState({ name: '', description: '' });
    const [isLoadingState, setLoadingState] = useState(false);
    const [channelsState, setChannelsState] = useState([]);
    const [modalOpenState, setModalOpenState] = useState(false);

    const channelsRef = firebase.database().ref("channels");
    const usersRef = firebase.database().ref("users");

    useEffect(() => {
        channelsRef.on('child_added', (snap) => {
            setChannelsState((currentState) => {
                let updatedState = [...currentState];
                updatedState.push(snap.val());
                return updatedState;
            })
        });

        return () => channelsRef.off();
    }, [])

    useEffect(() => {
        if (channelsState.length > 0) {
            props.selectChannel(channelsState[0])
        }
    }, [!props.channel ? channelsState : null])

    const openModal = () => {
        setModalOpenState(true);
    }

    const closeModal = () => {
        setModalOpenState(false);
    }

    const validateForm = () => {
        return channelAddState && channelAddState.name && channelAddState.description;
    }

    const showAllChannels = () => {
        if (channelsState.length > 0) {
            return channelsState.map((channel) => {
                return <Menu.Item
                    key={channel.id}
                    name={channel.name}
                    onClick={() => selectChannel(channel)}
                    active={props.channel && channel.id === props.channel.id && !props.channel.isFavourite}
                >
                </Menu.Item>
            })
        }
    }

    const selectChannel = (channel) => {
        setLastVisited(props.user, props.channel);
        setLastVisited(props.user, channel);
        props.selectChannel(channel);
    }

    const setLastVisited = (user, channel) => {
        const lastVisited = usersRef.child(user.uid).child("lastVisited").child(channel.id);
        lastVisited.set(firebase.database.ServerValue.TIMESTAMP);
        lastVisited.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
    }

    const onSubmit = () => {

        if (!validateForm()) {
            return;
        }

        const key = channelsRef.push().key;

        const channel = {
            id: key,
            name: channelAddState.name,
            description: channelAddState.description,
            created_by: {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }
        setLoadingState(true);
        channelsRef.child(key)
            .update(channel)
            .then(() => {
                setChannelAddState({ name: '', description: '' });
                setLoadingState(false);
                closeModal();
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleInput = (e) => {

        let target = e.target;
        setChannelAddState((currentState) => {
            let updatedState = { ...currentState };
            updatedState[target.name] = target.value;
            return updatedState;
        })
    }

    return <> <Menu.Menu style={{ marginTop: '35px' }}>
        <Menu.Item style={{ fontSize: '17px' }}>
            <span>
                <Icon name="exchange" /> All Channels
            </span>
            ({channelsState.length})
        </Menu.Item>
        {showAllChannels()}
        <Menu.Item>
            <span className="clickable" onClick={openModal} >
                <Icon name="add" /> New Channel
            </span>
        </Menu.Item>
    </Menu.Menu>
        <Modal open={modalOpenState} onClose={closeModal}>
            <Modal.Header>
                Create a new Channel
            </Modal.Header>
            <Modal.Content>
                <Form onSubmit={onSubmit}>
                    <Segment stacked>
                        <Form.Input
                            name="name"
                            value={channelAddState.name}
                            onChange={handleInput}
                            type="text"
                            placeholder="Channel Name"
                        />
                        <Form.Input
                            name="description"
                            value={channelAddState.description}
                            onChange={handleInput}
                            type="text"
                            placeholder="Channel Description"
                        />
                    </Segment>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button loading={isLoadingState} onClick={onSubmit}>
                    <Icon name="checkmark" /> Save
                </Button>
                <Button onClick={closeModal}>
                    <Icon name="remove" /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>
    </>
}

export default connect(mapStateToProps, mapDispatchToProps)(Channel);