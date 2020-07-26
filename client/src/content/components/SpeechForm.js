import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ListenButtons from './ListenButtons';

const SpeechForm = (props) => {
    return (
        <Container 
        maxWidth="sm">
        <div className="feedback-form">
            <div className="feedback-instructions">
            <Typography variant="h6">Speak or type!
            </Typography>
            </div>
                <br />
            <ListenButtons />
            <div className="feedbackBtn">
                <Button variant="contained" color="primary" type={"submit"}>Get Feedback</Button>
            </div>
        </div>
    </Container>
    )
}

export default SpeechForm;