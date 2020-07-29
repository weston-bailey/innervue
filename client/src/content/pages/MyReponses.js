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
          // console log of object containing user's answered questions from the database
          console.log(response.data)
          // TODO convert response.data object to array 
          
          // TODO set questions to array of questions 
          
          // setQuestions()
        } else {
          // set state for server status message and rerender
          setStatusMessage(response.data.message);
          setShowStatusMessage(true);
        }
    })
    .catch(err => console.log(err))
  }

  return (
      <div>
          <p>{ statusMessage }</p>
          my responses
      </div>
  );
};

export default MyResponses;