import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const GetFeedback = () => {
    return (
        <Container className="big-feedback">
            <Container>
            <div className="feedback-instructions">
                <Typography className="caption" variant="h2">Speak or type!
                </Typography>
            </div>
            <Typography variant="h6">Use the form below to get your thoughts on paper, or to practice your responses in the mirror. 
                We will make sure to give you the best feedback on your interview responses and the goal is to get better with practice!
                You've got this, just keep going!
                </Typography>
            </Container>
            <div>
                <FeedbackForm />
            </div>
        </Container>
    );
};

export default GetFeedback;