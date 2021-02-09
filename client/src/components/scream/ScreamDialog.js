import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
// util
import MyButton from '../../util/myButton';
import DialogSkeleton from '../../util/DialogSkeleton';
// Components
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
// Redux
import { getScream, clearErrors } from '../../redux/action/dataAction';
import { connect } from 'react-redux';
//MUI stuff
import {
    withStyles,
    Card,
    CardHeader,
    CardActions,
    CardMedia,
    CardContent,
    Avatar,
    Dialog,
    DialogContent,
    Typography
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
// import { UnfoldMore } from '@material-ui/icons';
import CommentIcon from '@material-ui/icons/Comment';

const styles = theme =>({
    visibleSeparator: {
        width: '100%',
        marginBottom: 20,
        borderBottom: '1px solid rgba(0,0,0,0.1)'
    },
    cardText: {
        color: theme.palette.primary.main
    },
    root: {
        position: 'relative',
        maxWidth: 600,
        margin: theme.spacing(0),
        color: theme.palette.primary.main,
        backgroundColor: theme.palette.secondary.light
    },
    screamDialogIcon: {
        color: theme.palette.primary.main
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
    dialogContent: {
        backgroundColor: theme.palette.secondary.light
    },
    // expandButton: {
    //     position: 'absolute',
    //     left: '90%'
    // },
})

class ScreamDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }
    componentDidMount() {
        if (this.props.openDialog){
            this.handleOpen()
        }
    }
    handleOpen = () => {
        let oldPath = window.location.pathname;

        const { userHandle, screamId } = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`

        if(oldPath === newPath) oldPath = `/users/${userHandle}`;

        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath, newPath});
        this.props.getScream(this.props.screamId);
    }
    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    }
    render() {
        const screamid = 'screamid'
        const {
            classes,
            scream: {
                screamId,
                body,
                createdAt,
                likeCount,
                commentCount,
                userImage,
                userHandle,
                comments
            },
            UI: { loading }
        } = this.props
        const dialogMarkup = loading ? (
            <DialogSkeleton />
        ) : (
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar alt="Profile image" src={ userImage } className={classes.large} />
                    }
                    action={
                        <MyButton
                            arialabel="close"
                            tip="Close"
                            onClick={this.handleClose}
                            tipClassName={classes.closeButton}
                        >
                            <CloseIcon className={classes.screamDialogIcon} />
                        </MyButton>
                    }
                    title={
                        <Typography
                            component={Link}
                            className={classes.cardText}
                            variant="h6"
                            to={`/users/${userHandle}`}
                        >
                            @{userHandle}
                        </Typography>
                    }
                    subheader={
                        <Typography
                            variant = "body2"
                            color = "textSecondary"
                        >
                            <span className={classes.cardText}> {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} </span>
                        </Typography>
                    }
                />
                <CardMedia
                    image = { userImage }
                    title = "Profile image"
                    className = { classes.media }
                />
                <CardContent className = { classes.content }>
                    <Typography
                        variant = "body2"
                    >
                        <span className={classes.cardText}> { body } </span>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <MyButton tip = "likes" >
                        <LikeButton screamId = { screamId }/>
                    </MyButton>
                    <span className={classes.cardText}> { likeCount } Likes </span>
                    <MyButton tip = "comments" >
                        <CommentIcon className={classes.screamDialogIcon} color = 'primary' />
                    </MyButton>
                    <span className={classes.cardText}> { commentCount } comments </span>
                </CardActions>
                <hr className={classes.visibleSeparator} />
                <CommentForm screamId={screamId} />
                <Comments comments = {comments} />
                {/* <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid> */}
                {/* <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/users/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography
                        variant='body2'
                        color="textSecondary"
                    >
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} likes</span>
                    <MyButton tip="comments">
                        <ChatIcon color='primary' />
                    </MyButton>
                    <span>{commentCount} comments</span>
                </Grid> */}
                {/* <hr className={classes.visibleSeparator} />
                <CommentForm screamId={screamId} />
                <Comments comments = {comments} /> */}
            </Card>
        )
        return (
            <Fragment>
                <MyButton arialabel="Comments" onClick={this.handleOpen} tip="Comments" tipClassName={classes.expandButton}>
                    <CommentIcon className={classes.screamDialogIcon}/>
                </MyButton>
                <Dialog
                    id={screamid}
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    {/* <MyButton
                        arialabel="close"
                        tip="Close"
                        onClick={this.handleClose}
                        tipClassName={classes.closeButton}
                    >
                        <CloseIcon />
                    </MyButton> */}
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    clearErrors: PropTypes.func.isRequired,
    userHandle: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream,
    clearErrors
}


export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))