import React, { useState } from 'react';
import SpeechForm from './SpeechForm';
import WriteForm from './WriteForm';

const FeedbackForm = () => {
    const [isListening, setIsListening] = useState(false)

    const displaySpeechForm = (
        <SpeechForm />
    )

    const displayWriteForm = (
        <WriteForm />
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