import React, { Component, Fragment } from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import PropTypes from 'prop-types';
import {
    withStyles,
    Card,
    CardHeader,
    CardActions
} from '@material-ui/core';

const styles = theme =>({
    visibleSeparator: {
        width: '100%',
        marginBottom: 20,
        borderBottom: '1px solid rgba(0,0,0,0.1)'
    },
    root: {
        boxShadow: 'none',
        position: 'relative',
        maxWidth: 600,
        margin: theme.spacing(0),
        backgroundColor: theme.palette.secondary.light
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    image: {
        minWidth: 100
    },
    media: {
        height: 390,
        minWidth: 100,
    },
    content: {
        padding: 25,
        objectFit: 'cover'
    },
    profileImage: {
        maxWidth: 200,
        height: 200,
        boderRadius: '50%',
        objectFit: 'cover'
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    comment: {
        marginLeft: 10
    },
    commentB: {
        marginLeft: 20
    },
    like: {
        marginLeft: 10
    }
});

class DialogScream extends Component {
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Skeleton animation="wave" variant="circle" width={40} height={40} />
                        }
                        action={
                            null
                        }
                        title={
                            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                        }
                        subheader={
                            <Skeleton animation="wave" height={10} width="40%" />
                        }
                    />
                        <Skeleton animation="wave" variant="rect" className={classes.media} />
                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                    <CardActions disableSpacing>
                        <Skeleton animation="wave" variant="circle" width={20} height={20} />
                        <Skeleton className={classes.like} animation="wave" variant="rect" width="30%" height={10} />
                        <Skeleton className={classes.commentB} animation="wave" variant="circle" width={20} height={20} />
                        <Skeleton className={classes.comment} animation="wave" variant="rect" width="30%" height={10} />
                    </CardActions>
                </Card>
            </Fragment>
        );
    }
}

DialogScream.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(DialogScream);