import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { googleSignInStart, emailSignInStart } from "../../redux/user/user-actions";
import './sign-in.styles.scss';

const SignIn = ( { emailSignInStart, googleSignInStart } ) => {
    const [ userCredentials, setCredentials ] = useState({
        email: '', password: ''
    });

    const { email, password } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();

        // it'll jump to user.saga file
        emailSignInStart(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;

        setCredentials({ ...setCredentials, [ name ]: value });
    }

    return (
        <div className="sign-in">
            <h2>I Already Have An Account.</h2>
            <span>Please Log In With Email And Password.</span>

            <form onSubmit={ handleSubmit }>
                <FormInput
                    name="email"
                    type="email"
                    value={ email }
                    handleChange={ handleChange }
                    label="Email"
                    required
                />
                <FormInput
                    name="password"
                    type="password"
                    value={ password }
                    handleChange={ handleChange }
                    label="Password"
                    required
                />
                <div className="buttons">
                    <CustomButton type="submit"> Sign In</CustomButton>
                    <CustomButton type='button' onClick={ googleSignInStart } isGoogleSignIn>
                        Sign-In With Google
                    </CustomButton>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: ( email, password ) => dispatch(emailSignInStart({ email, password }))
});

export default connect(null, mapDispatchToProps)(SignIn);