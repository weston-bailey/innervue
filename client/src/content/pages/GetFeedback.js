import React from 'react';
import FeedbackForm from '../components/FeedbackForm';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import QuestionSelector from '../components/QuestionSelector'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        fontSize: '10em',
        color: 'white',
        height: '5em',
        padding: theme.spacing(20, 10)
    },
    banner: {
        backgroundColor: "#90caf9",
        height: '100%',
        color: "#000",
        fontSize: "2rem",
        paddingLeft: "50px",
        paddingTop: "25px"
    },
    feedback: {
        textAlign: "right"
    }

}));

const GetFeedback = (props) => {
    const classes = useStyles()
    return (
            <Grid container spacing={6}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                    <Box className={classes.banner}>
                        <div className="feedback-instructions">
                        <h1>feedback</h1>
                        <Grid item xs={4}>
                                <p>Talk or type in the text box and submit to get instant feedback on your response!</p>
                            </Grid> 
                        </div>
                        <Grid container spacing={6}>
                            <Grid item xs={6}>
                            <FeedbackForm className={classes.feedback}/>
                            </Grid>
                            <Grid item xs={5}>
                            <QuestionSelector/>
                        </Grid>   
                        </Grid>   
                    </Box>
                </Grid>
            </Grid>
    );
};

export default GetFeedback;