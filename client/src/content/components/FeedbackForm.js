import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '@material-ui/core/Button'
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from '@material-ui/core/Container';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Typography from '@material-ui/core/Typography';
import StopIcon from '@material-ui/icons/Stop';
import Axios from 'axios';


const FeedbackForm = () => {

    const [isListening, setIsListening] = useState(false)
    const [createEntry, setCreateEntry] = useState(false)
    const [inputs, setInputs] = useState({
        answer: '',
        content: '',
        category: ''
      })
        
    // here we will handle the change in the text user types
    const handleInputChange = e => {
        // e.persist();
        console.log(`Making a change to ${e.target.name}`)
        setInputs({...inputs, [e.target.name]: e.target.value})
      }
    
    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true })
        setIsListening(true)
        // setInputs({
        //     answer: transcript,
        //     content: '',
        //     category: ''
        // })
    }

    const stopListening = () => {
        SpeechRecognition.stopListening()
        setIsListening(false)
    }
    
    const {interimTranscript, transcript, finalTranscript, resetTranscript } = useSpeechRecognition()

    useEffect(() => {
        if (interimTranscript !== '') {
            // console.log('Got interim result:', interimTranscript)
            setInputs({
                answer: transcript,
                content: null,
                category: null
            })
        }
        if (finalTranscript !== '') {
            // console.log('Got final result:', finalTranscript)
        }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    const handleSubmit = e => {
        e.preventDefault()
        Axios.post(`http://localhost:3001/users/5f1f1cfa9b514a6ab4df5d66/questions`, inputs)
            .then(response => {
                if (response.status === 200) {
                    console.log(response.data.answeredQuestions)
                    console.log("🌴")
                    setCreateEntry(true)
                } else {
                    console.log(response.statusText)
                }
            })
            .catch(err => console.log(err))
    }

    const displaySpeechForm = (
        <Container 
        maxWidth="sm">
            <div className="feedback-form">
            <form className="feedbackBtn" onSubmit={
                handleSubmit}>
                <div className="feedback-instructions">
                <Typography variant="h6">Speak or type!
                </Typography>
                </div>
                    <br />
                    <div>
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
                        stopListening()}
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
                    <TextareaAutosize 
                        name="answer"
                        className="speech-results"
                        rowsMin={15}
                        value={transcript}
                        >Transcription:
                    </TextareaAutosize>
                </div>
                    <Button variant="contained" color="secondary" type="submit">Get Feedback</Button>
            </form>
        </div>
    </Container>
    )

    const displayWriteForm = (
        <Container
            maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <div className="feedback-form">
                    <div className="feedback-instructions">
                    <Typography variant="h6">Speak or type!
                    </Typography>
                    </div>
                        <br />
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
                        stopListening()}
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
                    <TextareaAutosize 
                        className="feedback-form-box"
                        name="answer"
                        onChange={handleInputChange}
                        rowsMin={15}>
                    </TextareaAutosize>
                    <div className="feedbackBtn">
                    <Button variant="contained" color="secondary" onSubmit={handleSubmit} type="submit">Get Feedback</Button>
                    </div>
                </div>
            </form>
        </Container>
    )

    // get one where we are talking into it, or one where we are supposed to write
    let correctForm = isListening ? displaySpeechForm :  displayWriteForm

    return (
        <div className="show-correct-form">
            {correctForm}
        </div>
    )
}

export default FeedbackForm;