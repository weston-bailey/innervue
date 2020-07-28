import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const MyResponses = (props) => {

  // decode user data from jwt token
  const decoded = jwt_decode(localStorage.getItem('jwtToken'));
  console.log(decoded)

  // TODO make axios GET request to users/:userId/questions
  // to retrive a user's questions
  // decoded.id is the current user's id
  // check decoded in the console for user info like name

    return (
        <div>
            my responses
        </div>
    );
};

export default MyResponses;