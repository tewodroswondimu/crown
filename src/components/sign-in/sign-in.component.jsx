import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { auth } from '../../firebase/firebase.utils';

import './sign-in.style.scss'; 

import { signInWithGoogle } from '../../firebase/firebase.utils';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '', 
            password: '', 
        }
    }

    handleSubmit = async event => {
        event.preventDefault()

        const { email, password } = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            // clear our form
            this.setState({
                email: '', 
                password: ''
            })

        } catch (error) {
            console.error(error);
        }
    }

    // takes an event, gets the target value and name and sets it to the state, this is to allow
    // form component to be reused
    handleChange = event => {
        // pull the value and name of the event target which is the input value
        const { value, name } = event.target;

        // then set the state of that name to the value
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="sign-in">
                <h1>I already have an account</h1>
                <span>Sign in with your email and password</span> 

                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} type="email" name="email" value={this.state.email} required label="Email" />
                    <FormInput handleChange={this.handleChange} type="password" name="password"  value={this.state.password} required label="Password" />
                    <div className='buttons'>
                        <CustomButton type="submit">
                            Sign In
                        </CustomButton>
                        <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>
                            Sign In With Google
                        </CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

export default SignIn; 

