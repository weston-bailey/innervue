import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1
  },
}));

export default function ButtonAppBar(props) {
  console.log('appbar', props)
  const classes = useStyles();

  const isAuthed = (
    <div>
      <Button color="inherit">
        <Link className="nav-link" to="/myresponses">My Responses</Link>
      </Button>
      <Button color="inherit">
        <Link className="nav-link" to="/feedback" onClick={() => {
          props.setAnalysis(false)
        }}>Get Feedback</Link>
      </Button>
      <Button color="inherit">
        <Link className="nav-link" to="/login" onClick={props.handleLogout}>Logout</Link>
      </Button>
    </div>
  )

  const notAuthed = (
    <div>
      <Button color="inherit">
        <Link className="nav-link" to="/login">Login</Link>
      </Button>
      <Button color="inherit">
        <Link className="nav-link" to="/signup">Signup</Link>
      </Button>
    </div>
  )

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h3" className={classes.title}>
            <Link className="nav-link" to="/">innervue</Link>
          </Typography>
          {props.isAuthenticated ? isAuthed : notAuthed}
        </Toolbar>
      </AppBar>
    </div>
  );
}


