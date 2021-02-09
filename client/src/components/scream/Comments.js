import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import dayjs from 'dayjs';
// MUI stuff
import { withStyles, Typography,
    CardHeader,
    CardContent,
    Avatar,
} from '@material-ui/core';

const styles = (theme) => ({
    //...theme,
    commentImage: {
        maxWidth: '100%',
        height: 100,
        objectFit: 'cover',
        borderRadius: '50%'
    },
    commentData: {
        marginLeft: 20
    },
    invisibleSeparator: {
        border: "none",
        margin: 4
    },
    visibleSeparator: {
        width: '100%',
        marginBottom: 20,
        borderBottom: '1px solid rgba(0,0,0,0.1)'
    }
})

class Comments extends Component {
    render() {
        const { comments, classes } = this.props
        return(
            <Fragment>
                {/* Mapping through the comments in array */}
                {/* Extracting four key element from comment to display on the screen */}
                {comments.map((comment, index) => {
                    const { body, createdAt, userImage, userHandle } = comment;
                    return (
                        <Fragment key={createdAt}>
                            <CardHeader
                                avatar={
                                    <Avatar alt="Profile image" src={ userImage } className={classes.large} />
                                }
                                action={
                                    null
                                }
                                title={
                                    <Typography
                                        component={Link}
                                        color="primary"
                                        variant="h6"
                                        to={`/users/${userHandle}`}
                                    >
                                        {userHandle}
                                    </Typography>
                                }
                                subheader={
                                    <Typography
                                        variant = "body2"
                                        color = "textSecondary"
                                    >
                                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                    </Typography>
                                }
                            />
                            <CardContent className = { classes.content }>
                                <Typography
                                    variant = "body2"
                                >
                                    { body }
                                </Typography>
                            </CardContent>
                            {/* <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img
                                            src={userImage}
                                            alt="comment"
                                            className={classes.commentImage}
                                        />
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography
                                                variant="h5"
                                                component={Link}
                                                to={`/users/${userHandle}`}
                                                color="primary"
                                            >
                                                {userHandle}
                                            </Typography>
                                            <Typography variant="body" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator} />
                                            <Typography variant="body1">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid> */}
                            {/* Remove the hr line from the last comment */}
                            {index !== comments.length - 1 && (
                                <hr className={classes.visibleSeparator} />
                            )}
                        </Fragment>
                    )
                })}
            </Fragment>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Comments)