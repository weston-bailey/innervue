import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import StopIcon from '@material-ui/icons/Stop';
import Button from '@material-ui/core/Button'


const ListenButtons = () => {
    const [inputs, setInputs] = useState({
        inputs: ''
      })
    
    const startListening = () => {
        SpeechRecognition.startListening({ continuous: true })
        setIsListening(true)
    }

    const stopListening = () => {
        SpeechRecognition.stopListening()
        setIsListening(false)
    }
    
    const [isListening, setIsListening] = useState(false)

    const {interimTranscript, transcript, finalTranscript, resetTranscript } = useSpeechRecognition()

    useEffect(() => {
        if (interimTranscript !== '') {
            // console.log('Got interim result:', interimTranscript)
        }
        if (finalTranscript !== '') {
            // console.log('Got final result:', finalTranscript)
        }
    }, [interimTranscript, finalTranscript]);

    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null
    }

    return (
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
                <div className="speech-results">Transcription: 
                    {transcript}
                </div>
            </div>
        )
}

export default ListenButtons