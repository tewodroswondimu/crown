import React from 'react'; 

import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super(); 

        this.state = {
            displayName: '', 
            email: '', 
            password: '', 
            confirmPassword: ''
        };
    }

    handleSubmit = async event => {
        event.preventDefault()

        const { displayName, email, password , confirmPassword } = this.state; 

        // validate if password and confirm password are the same
        if (password !== confirmPassword) {
            alert("passwords don't match"); 
            return;
        } 
        
        try {
            // we first get a user object that is created in firebase auth
            const { user } = await auth.createUserWithEmailAndPassword(email, password)

            // we want to then store our new user to firestore
            await createUserProfileDocument(user, {displayName})

            // this will clear our form
            this.setState({
                displayName: '', 
                email: '', 
                password: '', 
                confirmPassword: ''
            });
        } catch(error) {
            console.error(error);
        }
    };

    handleChange = event => {
        const { name, value } = event.target

        this.setState({[name]: value})
    }


    render() {
        const { displayName, email, password , confirmPassword } = this.state; 

        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
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
                    <CustomButton type='submit'>
                        SIGN UP
                    </CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;