import React, { useState } from 'react';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import ListenButtons from './ListenButtons';

const WriteForm = () => {
    const [inputs, setInputs] = useState({
        inputs: ''
      })

    const handleInputChange = e => {
        e.persist();
        console.log(`Making a change to ${e.target.name}`)
        setInputs({...inputs, [e.target.name]: e.target.value}
        )
      }

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
                <TextareaAutosize 
                    className="feedback-form-box"
                    name="textbox"
                    onChange={handleInputChange}
                    rowsMin={15}>
                </TextareaAutosize>
                <div className="feedbackBtn">
                <Button variant="contained" color="primary" type={"submit"}>Get Feedback</Button>
                </div>
            </div>
        </Container>
    )
}

export default WriteForm;