import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const useStyles = makeStyles((theme) => ({

    tipsContainer: {
        paddingTop: theme.spacing(3)
    },
    tipsTitle: {
        fontSize: "2rem"
    },
    card: {
        maxWidth: '100%'
    },
    media: {
        height: 240
    },
    cardActions: {
        display: "flex",
        margin: "0 10px",
        justifyContent:"center"
    },
}));

const CareerTips = () => {
    const classes = useStyles()
    return (
        <div>
            <Container maxWidth="lg" className={classes.tipsContainer}>
                <Typography variant="h4" color="secondary" className={classes.tipsTitle}>
                    Career Tips
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Title /* results.name*/
                                     </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Insert content here
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                    </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Title
                                     </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Insert content here
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                    </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Title
                                     </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Insert content here
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                    </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default CareerTips;