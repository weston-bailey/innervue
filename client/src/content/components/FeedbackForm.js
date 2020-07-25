import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';

const FeedbackForm = () => {
    return (
        <Container 
            maxWidth="sm">
            <div>
                <div>
                <Typography>You can submit your responses by speaking or typing.
                </Typography>
                <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<KeyboardVoiceIcon />}
                    >
                    Talk
                </Button>
                </div>
                <TextareaAutosize 
                aria-label="empty textarea" 
                placeholder="Empty" 
                rowsMin={15}
                className="feedback-form-box"
                />        
            </div>
            <Button variant="outlined" color="primary" type={"submit"}>Get Feedback</Button>
            <Button variant="outlined" color="primary" type={"submit"}>Save Response</Button>
        </Container>

    );
};

export default FeedbackForm;