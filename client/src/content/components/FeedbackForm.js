import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';


const FeedbackForm = () => {

    const { transcript, resetTranscript } = useSpeechRecognition()

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    return (
        <Container 
            maxWidth="sm">
                <div className="feedback-form">
                    <div className="feedback-instructions">
                    <Typography variant="h6">Speak or type!
                    </Typography>
                    <div className="feedback-buttons-row">
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<KeyboardVoiceIcon />}
                            onClick={SpeechRecognition.startListening}
                        >
                        Start
                        </Button>
                        <Button onClick={SpeechRecognition.stopListening}
                        startIcon={<StopIcon/>}
                        variant="contained"
                        color="secondary"
                        >Stop</Button>
                        <Button onClick={resetTranscript}
                        variant="contained"
                        color="secondary"
                        >Reset</Button>
                    </div>
                    <br />
                    </div>
                    <TextareaAutosize 
                    aria-label="empty textarea" 
                    placeholder="Empty" 
                    rowsMin={15}
                    variant="outlined"
                    className="feedback-form-box">
                        <p>{transcript}</p>
                    </TextareaAutosize>       
                <div className="feedback-buttons-row">
                    <Button variant="contained" color="primary" type={"submit"}>Get Feedback</Button>
                    <Button variant="contained" color="primary" type={"submit"}>Save Response</Button>
                </div>
                </div>
        </Container>
    );
};

export default FeedbackForm;