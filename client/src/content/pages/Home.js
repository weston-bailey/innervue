import React from 'react';
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import Icon from './Icon'

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
    screencast: {
        textAlign: "right",
        paddingLeft: "100px"
    }

}));

const Home = () => {
    const classes = useStyles()
    return (
        <div>
            <Grid container spacing={6}>
                <Grid item xs={12}></Grid>
                <Grid item xs={12}>
                    <Box className={classes.banner}>
                        <h1>innervue</h1>
                        <Grid container>
                            <Grid item xs={4}>
                                <p>Sometimes getting the job you want just takes a little practice in the mirror. </p>
                            </Grid>
                            <Grid item xs={6} >
                                <Icon />
                            </Grid>
                            <Grid item xs={12}></Grid>
                        </Grid>
                        {/* TODO: <Grid item xs={6} className={classes.screencast}>
                                <p>Insert screencast here</p>
                            </Grid> */}
                    </Box>
                </Grid>
            </Grid>
        </div>
    );
};

export default Home;