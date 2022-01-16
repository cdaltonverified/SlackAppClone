import React, {useState} from 'react';
import { Form, Grid, Segment, Header, Icon, Button, Message } from 'semantic-ui-react';

const Register = () => {

    let user = {
        username: '',
        email: '',
        password: ''
    }

    let errors = [];

    const [userState, setUserState] = useState(user);
    const [errorState, setErrorState] = useState(errors);

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
        if(validateForm()){

        }
    }

    const formatErrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>)
    }

    return (<Grid verticalAlign="middle" textAlign="center">
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
            <Button>Register</Button>
        </Form>
        {errorState.length > 0 && <Message error>
            <h2>An error occurred.</h2>
            {formatErrors()}
        </Message>
        }
    </Grid.Column>
    </Grid>)
}

export default Register;