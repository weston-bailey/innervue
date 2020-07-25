import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import Container from '@material-ui/core/Container';

const GetFeedback = () => {
    return (
        <Container>
            <div>
                <FeedbackForm />
            </div>
        </Container>
    );
};

export default GetFeedback;