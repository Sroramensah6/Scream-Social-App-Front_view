import React, { Fragment }from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: 'none',
        maxWidth: 500,
        margin: theme.spacing(4),
        backgroundColor: theme.palette.secondary.light
    },
    media: {
        height: 390,
    },
}));

function ScreamSkeleton() {
    const classes = useStyles();
    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card className={`stickyPaper ${classes.card}`}>
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circle" width={40} height={40} />
                }
                // action={
                //   loading ? null : (
                //     <IconButton aria-label="settings">
                //       <MoreVertIcon />
                //     </IconButton>
                //   )
                // }
                title={
                    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                }
                subheader={<Skeleton animation="wave" height={10} width="40%" /> }
            />
            <Skeleton animation="wave" variant="rect" className={classes.media} />
            <CardContent>
                <Fragment>
                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <Skeleton animation="wave" height={10} width="80%" />
                </Fragment>
            </CardContent>
        </Card>
    ))
    return content
}

export default ScreamSkeleton