import React from 'react';
import Copyright from '../components/Copyright';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '50vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    height: 150,
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    color: "#0d47a1",
    textAlign: "center"
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Container component="main" className={classes.main} maxWidth="sm">
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Typography color="#0d47a1">
          <Button>
          <Link to="/">innervue</Link>
          </Button>
          <Button>
          <Link to="/signup">Signup</Link>
          </Button>
          <Button color="inherit">
          <Link to="/login">Login</Link>
          </Button>
          </Typography>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}