// import axios

const axios = require("axios")

// write a funciion called setAuthToken
const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authoerization'] = token;
    console.log('TOKEN SET', token);
  } else {
    delete axios.defaults.headers.common['Authoerization']
  }
}

export default setAuthToken;
  // if token
    // send token as header to backen
  // else
    // delete any authorization token being held