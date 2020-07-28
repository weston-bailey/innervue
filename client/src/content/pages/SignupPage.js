import React from 'react';
import SignupForm from '../components/SignupForm'

const SignupPage = (props) => {
    return (
        <div>
            <SignupForm {...props} />
        </div>
    );
};

export default SignupPage;