import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const FlashMessage = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Dialog
        open={props.showStatusMessage}
        onClose={props.handleCloseMessage}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Alert severity={props.statusMessage.type}>
            <AlertTitle>{props.statusMessage.title}</AlertTitle>
            {props.statusMessage.content}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseStatusMessage} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default FlashMessage;