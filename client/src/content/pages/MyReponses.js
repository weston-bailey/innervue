import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const MyResponses = (props) => {
  // if a status message should be shown from the server
  const [showStatusMessage, setShowStatusMessage] = useState(false);
  // the message form the server
  const [statusMessage, setStatusMessage] = useState(null);
  // questions retrived from database
  const [questions, setQuestions] = useState(null);

  // decode user data from jwt token
  const decoded = jwt_decode(localStorage.getItem('jwtToken'));
  console.log(decoded)

  // only call server when responses or status message are empty
  if(!questions && !statusMessage){
    console.log('hit')
  
    axios.get(`http://localhost:3001/users/${decoded.id}/questions`)
    .then(response => {
        if (response.status === 201) {
          setQuestions(response.data)
        } else {
          // set state for server status message and rerender
          setStatusMessage(response.data.message);
          setShowStatusMessage(true);
        }
    })
    .catch(err => console.log(err))
  }

  let responses;

  let loading = (
    <div>
      <p>loading....</p>
    </div>
  )

  if(questions){

     responses = questions.map(question => {
        question.analysis.negativeMentions.map(negativeMention => {
          return(
            <div>
              <p>{negativeMention} was mentioned negatively mentioned </p>
            </div>
          )
        })

      return (
        <div>
          <p>category: {question.category}</p>
          <p>question: {question.content}</p>
          <p>response: {question.answer}</p>
          <p>over all score: {question.analysis.overallMagnitude} {question.analysis.overallScore} </p>
          <p>feedback: {question.analysis.overallFeedback}</p>
          <p>{question.analysis.negativeMentions}</p>
        </div>
      )
    })

  }

  return (
      <div>
          <p>{ statusMessage }</p>
          my responses
          { responses ? responses : loading }
      </div>
  );
};

export default MyResponses;