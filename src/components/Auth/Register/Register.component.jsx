import React, {useState} from 'react';
import { Form, Grid, Segment, Header, Icon, Button, Message } from 'semantic-ui-react'
import firebase from '../../../server/firebase'
import { Link } from 'react-router-dom'

import "./Register.css"

const Register = () => {

    let user = {
        username: '',
        email: '',
        password: ''
    }

    let errors = [];
    let userCollectionRef = firebase.database().ref('users');

    const [userState, setUserState] = useState(user);
    const [errorState, setErrorState] = useState(errors);
    const [pageLoading, setPageLoading] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);

    const updateFormState = (event) =>{
        let target = event.target;
        setUserState((currentState) => {
            let currentUser = {...currentState};
            currentUser[target.name] = target.value;
            return currentUser;
        })
    }

    const validateForm = () => {
        if(isFormFieldMissing()){
            setErrorState((error) => error.concat({message: "Missing form fields!"}))
            return false;
        }
        return true;
    }

    const isFormFieldMissing = () => {
        return !userState.username.length || !userState.password.length || !userState.email.length;
    }

    const onSubmit = (event) => {
        setErrorState(() => []);
        setIsRegistered(false);
        if(validateForm()){
            setPageLoading(true);
            firebase.auth()
            .createUserWithEmailAndPassword(userState.email, userState.password)
            .then(createdUser => {
                setPageLoading(false);
                updateUserProfile(createdUser);
            })
            .catch(firebaseError => {
                setPageLoading(false);
                setErrorState((error) => error.concat(firebaseError));
            })
        }
    }

    const formatErrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }

    const updateUserProfile = ( createdUser) => {
        if(createdUser){
            setPageLoading(true);
            createdUser.user.updateProfile({
                displayName: userState.username,
                photoURL: `https://gravatar.com/avatar/${createdUser.user.uid}?d=identicon`
            })
            .then(() => {
                setPageLoading(false);
                saveUserDetailsInDatabase(createdUser);
            })
            .catch((firebaseError) => {
                setPageLoading(false);
                setErrorState((error) => error.concat(firebaseError));
            })
        }
    }

    const saveUserDetailsInDatabase = (createdUser) => {
        setPageLoading(true);
        userCollectionRef.child(createdUser.user.uid).set({
            displayName: createdUser.user.displayName,
            photoURL: createdUser.user.photoURL
        })
        .then(() => {
            setPageLoading(false);
            setIsRegistered(true);
        })
        .catch(firebaseError => {
            setPageLoading(false);
            setErrorState((error) => error.concat(firebaseError));
        })
    }

    return (<Grid verticalAlign="middle" textAlign="center" className="grid-form">
    <Grid.Column style={{maxWidth: '550px'}}>
        <Header icon as = "h1">
            <Icon name="slack" />
            Create a Slack Account
        </Header>
        <Form onSubmit={onSubmit}>
            <Segment stacked>
                <Form.Input 
                name = "username"
                value = {userState.username}
                icon = "user"
                iconPosition="left"
                onChange={updateFormState}
                type="text"
                placeholder="Username"
                />

                <Form.Input 
                name = "email"
                value = {userState.email}
                icon = "mail"
                iconPosition="left"
                onChange={updateFormState}
                type="email"
                placeholder="Email"
                />

                <Form.Input 
                name = "password"
                value = {userState.password}
                icon = "lock"
                iconPosition="left"
                onChange={updateFormState}
                type="password"
                placeholder="Password"
                />
            </Segment>
            <Button disabled={pageLoading} loading={pageLoading}>Register</Button>
        </Form>
        {errorState.length > 0 && <Message error>
            <h2>An error occurred.</h2>
            {formatErrors()}
        </Message>
        }
        {isRegistered && <Message success>
            <h2>Sign up successful.</h2>
        </Message>
        }
        <Message>
            Go to <Link to="/login">Login</Link> instead.
        </Message>
    </Grid.Column>
    </Grid>)
}

export default Register;