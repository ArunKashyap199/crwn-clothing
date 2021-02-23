import React from 'react';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {auth, createUserProfileDocuments} from "../../firebase/firebase.utils";
import './sign-up.styles.scss';


class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            error: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, email, password, confirmPassword, error} = this.state;

        if (password !== confirmPassword) {
            alert("Password Doesn't match");
        }

        try {
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            await createUserProfileDocuments(user, {displayName})

            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.log("There Is An Error", error.message);
            this.setState({
                error: error.message
            });

        }
    };

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({[name]: value});
    }

    render(displayName, email, password, confirmPassword, error) {
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span> Sign up with email and password</span>
                <span>{this.state.error}</span>

                <form className='sign-up-from' onSubmit={this.handleSubmit}>
                    <FormInput
                        type='text'
                        name='displayName'
                        value={displayName}
                        onChange={this.handleChange}
                        label='Display Name'
                        required
                    />
                    <FormInput
                        type='email'
                        name='email'
                        value={email}
                        onChange={this.handleChange}
                        label='Email'
                        required
                    />
                    <FormInput
                        type='password'
                        name='password'
                        value={password}
                        onChange={this.handleChange}
                        label='Password'
                        required
                    />
                    <FormInput
                        type='password'
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required
                    />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;