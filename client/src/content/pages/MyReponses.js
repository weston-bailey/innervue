import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AnalysisAccordion from '../components/AnalysisAccordion';
import FlashMessage from '../components/FlashMessage';

const MyResponses = (props) => {
  // if a status message should be shown from the server
  const [showStatusMessage, setShowStatusMessage] = useState(false);
  // the message form the server
  const [statusMessage, setStatusMessage] = useState({
    type: '',
    title: '',
    content: null
  });
  // questions retrived from database
  const [questions, setQuestions] = useState(null);

  // decode user data from jwt token
  const decoded = jwt_decode(localStorage.getItem('jwtToken'));

  const handleCloseStatusMessage = () => {
    setShowStatusMessage(false);
  };

  // only call server when responses or status message are empty
  if(!questions && !statusMessage.content){
    axios.get(`${process.env.REACT_APP_SERVER_URL}users/${decoded.id}/questions`)
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
  
  // loading message (waiting on server response)   
  let loading = (
    <div>
      <p>loading....</p>
    </div>
  )
  // responses to render   
  let responses;
  
  // only map questions if it is not null   
  if(questions){

     responses = questions.map(question => {
        question.analysis.negativeMentions.map(negativeMention => {
          return(
            <div>
              <p>{negativeMention} was mentioned negatively </p>
            </div>
          )
        })
       let analysisResponse = <div>
       <p>Your response: {question.answer}</p>
       <p>Overall score: {question.analysis.overallMagnitude} {question.analysis.overallScore} </p>
       <p>Feedback: {question.analysis.overallFeedback}</p>
       Negative mentions: {question.analysis.negativeMentions.join(', ')}  
       </div>
       
      return (
        <div>
          <AnalysisAccordion
          analysisResponse={analysisResponse} question={question.content} category={question.category}
           />
        </div>
      )
    })

  }

  return (
      <div>
        <h1>My Responses</h1>
        <FlashMessage 
          statusMessage={statusMessage} 
          handleCloseStatusMessage={handleCloseStatusMessage} 
          setShowStatusMessage={setShowStatusMessage}
          showStatusMessage={showStatusMessage}
        />
        { responses ? responses : loading }
      </div>
  );
};

export default MyResponses;