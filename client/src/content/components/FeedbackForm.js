import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';


const FeedbackForm = () => {

    const [inputs, setInputs] = useState({
        inputs: ''
      })

    const handleInputChange = e => {
        e.persist();
        console.log(`Making a change to ${e.target.name}`)
        setInputs({...inputs, [e.target.name]: e.target.value}
        )
      }

    
    const {interimTranscript, transcript, finalTranscript, resetTranscript } = useSpeechRecognition()

    useEffect(() => {
        if (interimTranscript !== '') {
            console.log('Got interim result:', interimTranscript)
        }
        if (finalTranscript !== '') {
            console.log('Got final result:', finalTranscript)
        }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true })
    }

    const stopListening = () => {
        SpeechRecognition.stopListening()
    }
    

    const displaySpeechForm = (
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
                            onClick={startListening}
                        >
                        Start
                        </Button>
                        <Button onClick={() => {
                            stopListening()
                            setInputs(finalTranscript)
                            console.log(inputs)}
                        }
                        startIcon={<StopIcon/>}
                        variant="contained"
                        color="secondary"
                        >Stop</Button>
                        <Button onClick={resetTranscript}
                        variant="contained"
                        color="secondary"
                        >Reset</Button>
                    </div>
                    <div className="speech-results">
                        {finalTranscript}
                    </div>
                    <br />
                    </div>
                <div className="feedback-buttons-row">
                    <Button variant="contained" color="primary" type={"submit"}>Get Feedback</Button>
                </div>
            </div>
        </Container>
    )

    const displayWriteForm = (
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
                            onClick={() => {
                                SpeechRecognition.startListening({ continuous: true })
                            }}
                        >
                        Start
                        </Button>
                        <Button onClick={() => {
                            SpeechRecognition.stopListening()
                            setInputs(finalTranscript)
                            console.log(inputs)}
                        }
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
                        className="feedback-form-box"
                        name="textbox"
                        onChange={handleInputChange}
                        rowsMin={15}>
                    </TextareaAutosize>
                <div className="feedback-buttons-row">
                    <Button variant="contained" color="primary" type={"submit"}>Get Feedback</Button>
                </div>
            </div>
        </Container>
    )

    // get one where we are talking into it, or one where we are supposed to write
    let correctForm = startListening ? displaySpeechForm :  displayWriteForm

    return (
        <div className="show-correct-form">
            {correctForm}
        </div>
    )
}

export default FeedbackForm;