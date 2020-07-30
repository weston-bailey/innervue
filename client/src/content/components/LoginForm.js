import React, { useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import { Redirect } from 'react-router-dom';
import FlashMessage from '../components/FlashMessage';
import Copyright from '../components/Copyright';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginForm(props) {

  const classes = useStyles();
  // register form state for user input fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // redirect state if new user is made
  const [redirect, setRedirect] = useState(false);
  // if a status message should be shown from the server
  const [showStatusMessage, setShowStatusMessage] = useState(false);
  // the message form the server
  const [statusMessage, setStatusMessage] = useState({
    type: '',
    title: '',
    content: ''
  });

  const handleEmail = (e) => {
    setEmail(e.target.value);
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleCloseStatusMessage = () => {
    setShowStatusMessage(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
    }

    axios.post(`${process.env.REACT_APP_SERVER_URL}users/auth/login`, credentials)
    .then(response => {
      if(response.status === 201){
        // response.staus if user is found and logged in
        const { token } = response.data;
        console.log(token)
        // Save to LocalStorage
        localStorage.setItem('jwtToken', token);
        // Set token to Auth Header
        setAuthToken(token);
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // set current user (in App.js)
        props.nowCurrentUser(decoded)
        // Set current user
        setRedirect(true)
      } else {
        setStatusMessage(response.data.message);
        setShowStatusMessage(true);
      }

    })
      .catch(err => console.log(err));
  }

  // redirect 
  if (redirect) return <Redirect to="/feedback" />

  return (
    <Container component="main" maxWidth="xs">
      <FlashMessage 
        statusMessage={statusMessage} 
        handleCloseStatusMessage={handleCloseStatusMessage} 
        setShowStatusMessage={setShowStatusMessage}
        showStatusMessage={showStatusMessage}
      />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={ handleSubmit }>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={ handleEmail }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={ handlePassword }
          />
          {/* TODO */}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              {/* TODO */}
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <Link href="/signup" to="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}