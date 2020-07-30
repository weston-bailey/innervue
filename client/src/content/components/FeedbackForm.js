import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import FlashMessage from '../components/FlashMessage';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

const FeedbackForm = (props) => {
    const [isListening, setIsListening] = useState(false)
    const [inputs, setInputs] = useState({
      answer: '',
      content: '',
      category: ''
    });
    // if a status message should be shown from the server
    const [showStatusMessage, setShowStatusMessage] = useState(false);
    // the message form the server
    const [statusMessage, setStatusMessage] = useState({
      type: '',
      title: '',
      content: ''
    });
    
    const handleCloseStatusMessage = () => {
      setShowStatusMessage(false);
    };
        
    // here we will handle the change in the text user types
    const handleInputChange = e => {
        // e.persist();
        console.log(`Making a change to ${e.target.name}`)
        setInputs({...inputs, [e.target.name]: e.target.value})
    }
    
    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true })
        setIsListening(true)
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
                content: props.selectedQuestion,
                category: props.selectedCategory
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
      e.preventDefault();
      // mount props on input without setting state to handle edgecase
      inputs.content = props.selectedQuestion;
      inputs.category = props.selectedCategory;
      // get the current user from the jwt token
      const decoded = jwt_decode(localStorage.getItem('jwtToken'));
      axios.post(`${process.env.REACT_APP_SERVER_URL}users/${decoded.id}/questions`, inputs)
      .then(response => {
          if (response.status === 201) {
              props.setQuestion(response.data)
              props.setAnalysis(true)
          } else {
            // set state for server status message and re render
            setStatusMessage(response.data.message);
            setShowStatusMessage(true);
          }
      })
      .catch(err => console.log(err))
    }

    const displaySpeechForm = (
        <Grid container spacing={12}>
            <Grid item xs={12} className="feedback-buttons-row">
                <Button
                    variant="outlined"
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
                variant="outlined"
                color="secondary"
                >Stop</Button>
                <Button onClick={resetTranscript}
                variant="outlined"
                color="secondary"
                >Reset</Button>
            </Grid>
            <Grid item xs={6}>
            <form className="feedbackBtn" onSubmit={
                handleSubmit}>
                    <br />
                <TextareaAutosize 
                    name="answer"
                    className="feedback-form-box"
                    rowsMin={20}
                    value={transcript}
                    >Transcription:
                </TextareaAutosize>
                <Grid item xs={12}>
                <Button className="where" variant="outlined" color="secondary" type="submit">Get Feedback</Button>
                </Grid>
            </form>
            </Grid>
        </Grid>        
    )

    const displayWriteForm = (
        <Grid container spacing={6}>
            <Grid item xs={12} className="feedback-buttons-row">
                <Button
                    variant="outlined"
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
                variant="outlined"
                color="secondary"
                >Stop</Button>
                <Button onClick={resetTranscript}
                variant="outlined"
                color="secondary"
                >Reset</Button>
            </Grid>
            <Grid item xs={6}>
                <form onSubmit={handleSubmit}>    
                <br />
                    <TextareaAutosize 
                        className="feedback-form-box"
                        name="answer"
                        onChange={handleInputChange}
                        rowsMin={20}>
                    </TextareaAutosize>
                    <Grid item xs={12} className="feedbackBtn">
                    <Button variant="outlined" color="secondary" onSubmit={handleSubmit} type="submit">Get Feedback</Button>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )

    // get one where we are talking into it, or one where we are supposed to write
    let correctForm = isListening ? displaySpeechForm : displayWriteForm
    

    return (
        <div className="show-correct-form">
            <FlashMessage 
              statusMessage={statusMessage} 
              handleCloseStatusMessage={handleCloseStatusMessage} 
              setShowStatusMessage={setShowStatusMessage}
              showStatusMessage={showStatusMessage}
            />
            {correctForm}
        </div>
    )
}

export default FeedbackForm;