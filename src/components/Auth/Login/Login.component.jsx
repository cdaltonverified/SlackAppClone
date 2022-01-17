import React, {useState} from 'react';
import { Form, Grid, Segment, Header, Icon, Button, Message } from 'semantic-ui-react'
import firebase from '../../../server/firebase'
import { Link } from 'react-router-dom'

import "./Login.css"

const Login = () => {

    let errors = [];
    let user = {
        email: '',
        password: ''
    }

    const [userState, setUserState] = useState(user);
    const [errorState, setErrorState] = useState(errors);
    const [pageLoading, setPageLoading] = useState(false);

    const updateFormState = (event) =>{
        let target = event.target;
        setUserState((currentState) => {
            let currentUser = {...currentState};
            currentUser[target.name] = target.value;
            return currentUser;
        })
    }

    const formatErrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }

    const validateForm = () => {
        if(isFormFieldMissing()){
            setErrorState((error) => error.concat({message: "Missing form fields!"}))
            return false;
        }
        return true;
    }

    const isFormFieldMissing = () => {
        return !userState.email.length || !userState.password.length;
    }

    const onSubmit = (event) => {
        setErrorState(() => []);
        if(validateForm()){
            setPageLoading(true);
            firebase.auth()
            .signInWithEmailAndPassword(userState.email, userState.password)
            .then(userLoggedIn => {
                //
                setPageLoading(false);
            })
            .catch(firebaseError => {
                setPageLoading(false);
                setErrorState((error) => error.concat(firebaseError));
            })
        }
    }

    return (<Grid verticalAlign="middle" textAlign="center" className="grid-form">
    <Grid.Column style={{maxWidth: '550px'}}>
        <Header icon as = "h1">
            <Icon name="slack" />
            Login to Slack
        </Header>
        <Form onSubmit={onSubmit}>
            <Segment stacked>
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
            <Button disabled={pageLoading} loading={pageLoading}>Login</Button>
        </Form>
        {errorState.length > 0 && <Message error>
            <h2>An error occurred.</h2>
            {formatErrors()}
        </Message>
        }
        <Message>
            Go to <Link to="/register">Sign up</Link> instead.
        </Message>
    </Grid.Column>
    </Grid>)
}

export default Login;