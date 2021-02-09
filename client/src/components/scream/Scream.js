import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
// import clsx from 'clsx';
// Dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// Components
// import MyButton from '../../util/myButton'
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
import LikeButton from './LikeButton';
// MUI Stuffimport clsx from 'clsx';
import {
    withStyles,
    Card,
    CardHeader,
    CardActions,
    CardMedia,
    CardContent,
    Avatar,
    // Collapse,
    IconButton,
    Typography,
    Box
} from '@material-ui/core';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

import { connect } from 'react-redux';
// Mui Icons
// import CommentIcon from '@material-ui/icons/Comment';

// const mobileDrawerWidth = 73;

const styles = (theme) =>({
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    // mobileAppBar: {
    //     width: `calc(100% - ${mobileDrawerWidth}px)`,
    //     marginLeft: mobileDrawerWidth,
    //     backgroundColor: theme.palette.secondary.light
    // },
    cardHeader: {
        height: 110
    },
    cardText: {
        color: theme.palette.primary.main
    },
    cardCreatedAt: {
        color:' #8e9574',
        fontSize: 12
    },
    cardText2: {
        color: theme.palette.primary.notAuthB
    },
    cardMedia: {
        padding: 16
    },
    accessTime: {
        fontSize: 12
    },
    grow: {
        flexGrow: 1,
    },
    desktopRoot: {
        boxShadow: 'none',
        width: '100%',
        maxWidth: 500,
        position: 'relative',
        margin: theme.spacing(4),
        backgroundColor: theme.palette.secondary.light
    },
    mobileRoot: {
        top: 40,
        marginTop: 0,
        width: '100%',
        maxWidth: 500,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 50,
        boxShadow: 'none',
        position: 'relative',
        backgroundColor: theme.palette.secondary.light
    },
    desktopRoot2: {
        boxShadow: 'none',
        width: '100%',
        maxWidth: 500,
        position: 'relative',
        margin: theme.spacing(4),
        backgroundColor: theme.palette.secondary.notAuth,
    },
    mobileRoot2: {
        top: 40,
        marginTop: 0,
        width: '100%',
        maxWidth: 500,
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 50,
        boxShadow: 'none',
        position: 'relative',
        bbackgroundColor: theme.palette.secondary.notAuth,
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
        position: 'relative',
        textAlign: 'center',
        padding: 0,
        objectFit: 'cover'
    },
    expand: {
        marginLeft: 'auto',
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    delete: {
        backgroundColor: theme.palette.secondary.light
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
    createdAtBox: {
        position: 'absolute',
        left: '40%'
    },
    body: {
        position: 'relative',
        top: '14%',
        textAlign: 'center'
    },
    menu: {
        '& li': {
            height: '130%'
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
})
class Scream extends Component {

    state = {
        expanded : false,
        expandedExist : false,
        anchorEl: null,
        expandedMobile : false,
        expandedExistMobile : false,
        anchorElMobile: null
    }

    handleExpandClick = () => {
        this.setState({
            expanded: true
        });
    };
    handleExpandClickMobile = () => {
        this.setState({
            expandedMobile: true
        });
    };

    handleExpandClose = () => {
        this.setState({
            expandedExist: false
        });
    };

    handleExpandCloseMobile = () => {
        this.setState({
            expandedExistMobile: false
        });
    };

    handleProfileMenuOpen = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    }

    handleProfileMenuOpenMobile = (event) => {
        this.setState({
            anchorElMobile: event.currentTarget
        });
    }

    handleMenuClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    handleMenuCloseMobile = () => {
        this.setState({
            anchorElMobile: null
        });
    };

    render() {
        const header = 'headerId'
        const headerMobile = 'headerMobileId'
        dayjs.extend(relativeTime)
        const { /*expanded, expandedExist,*/ anchorEl, anchorElMobile, /*mobileMoreAnchorEl*/ } = this.state
        const isMenuOpen = Boolean(anchorEl);
        const isMenuOpenMobile = Boolean(anchorElMobile);
        const {
            classes,
            scream: {
                body,
                createdAt,
                userImage,
                userHandle,
                screamId,
                likeCount,
                commentCount
            },
            user: { authenticated, credentials: { handle } }
        } = this.props;
        const deleteButton = authenticated && userHandle === handle ?  (
            <DeleteScream className={classes.cardText} screamId={screamId} />
        ) : null ;

        const menuId = 'primary-delete-post';
        const renderMenu = (
            <Menu
                classes={{
                    paper: `smoothTransition ${classes.delete}`,
                }}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem className={classes.menu} onClick={this.handleMenuClose}> { deleteButton } </MenuItem>
            </Menu>
        );

        const menuMobileId = 'delete-post';
        const renderMenuMobile = (
            <Menu
                classes={{
                    paper: `smoothTransition ${classes.delete}`,
                }}
                anchorEl={anchorElMobile}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuMobileId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpenMobile}
                onClose={this.handleMenuCloseMobile}
            >
                <MenuItem className={classes.menu} onClick={this.handleMenuCloseMobile}> { deleteButton } </MenuItem>
            </Menu>
        );
        return (
            <Fragment>
            {authenticated ? (
                <>
                    <div className={`stickyPaper ${classes.sectionDesktop}`}>
                        <Card id={header} className = {`stickyPaper ${classes.desktopRoot}`}>
                            <CardHeader
                                className={classes.cardheader}
                                    avatar={
                                        <Avatar alt="Profile image" src={ userImage } className={classes.large} />
                                    }
                                    action={
                                        <Fragment>
                                            {authenticated && userHandle === handle ?  (
                                                <IconButton
                                                aria-label="show more"
                                                aria-controls={menuId}
                                                aria-haspopup="true"
                                                onClick={this.handleProfileMenuOpen}
                                                color="inherit"
                                                >
                                                    <MoreIcon className={classes.cardText} />
                                                </IconButton>
                                            ) : null }
                                        </Fragment>
                                    }
                                    title={
                                        <Box className={`stickyPaper ${classes.rootBox}`} display="flex" alignItems="center">
                                            <Box className={classes.handleBox}>
                                                <Typography
                                                    variant = "h6"
                                                    component = { Link }
                                                    to = { `/users/${userHandle}` }
                                                >
                                                    { userHandle } {/* deleteButton */}
                                                </Typography>
                                            </Box>
                                            {/* <Box className={classes.createdAtBox}>
                                                <Typography
                                                    variant = "body2"
                                                >
                                                    <span className={classes.cardCreatedAt}><AccessTimeIcon className={classes.accessTime}/> {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} </span>
                                                </Typography>
                                            </Box> */}
                                        </Box>
                                    }
                                    subheader={
                                        <Typography
                                            variant = "body2"
                                        >
                                            <span className={classes.cardCreatedAt}><AccessTimeIcon className={classes.accessTime}/> {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} </span>
                                        </Typography>
                                    }
                                />
                                {/* <Typography
                                    variant = "h6"
                                    component = { Link }
                                    to = { `/users/${userHandle}` }
                                    color = "primary"
                                >
                                    { userHandle }
                                </Typography>
                                <Typography
                                    variant = "body2"
                                    color = "textSecondary"
                                >
                                    { dayjs(createdAt).fromNow() }
                                </Typography>
                            </CardHeader> */}
                            <CardContent className = { classes.content }>
                                <Typography
                                    variant = "body2"
                                >
                                    <span className={`stickyPaper ${classes.cardText}`}>{ body }</span>
                                </Typography>
                            </CardContent>
                            <Typography
                                component="div"
                                variant="body1"
                                className={`stickyPaper ${classes.cardMedia}`}
                            >
                                <CardMedia
                                    image = { userImage }
                                    title = "Profile image"
                                    className = { classes.media }
                                />
                            </Typography>
                            <CardActions disableSpacing>
                                <LikeButton screamId = { screamId }/>
                                <span className={classes.cardText}> { likeCount !== 0 ? likeCount : null } </span>
                                <div className={classes.grow} />
                                <ScreamDialog
                                    screamId = { screamId }
                                    userHandle = { userHandle }
                                    openDialog = { this.props.openDialog }
                                />
                                {/* <MyButton tip = "comments" >
                                    <CommentIcon className={classes.cardText} />
                                </MyButton> */}
                                <span className={classes.cardText}> { commentCount !== 0 ? commentCount : null } </span>
                                <div className={classes.grow} />
                                {/* <IconButton aria-label="like">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton> */}
                                {/* { deleteButton } */}
                                {/*<IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>*/}
                            </CardActions>
                        {renderMenu}
                        </Card>
                    </div>
                    <div className={`stickyPaper ${classes.sectionMobile}`}>
                            <Card id={headerMobile} className = {`stickyPaper mobileRoot1 ${classes.mobileRoot}`}>
                                <CardHeader
                                    className={classes.cardheader}
                                        avatar={
                                            <Avatar alt="Profile image" src={ userImage } className={classes.large} />
                                        }
                                        action={
                                            <Fragment>
                                                {authenticated && userHandle === handle ?  (
                                                    <IconButton
                                                    aria-label="show more"
                                                    aria-controls={menuMobileId}
                                                    aria-haspopup="true"
                                                    onClick={this.handleProfileMenuOpenMobile}
                                                    color="inherit"
                                                    >
                                                        <MoreIcon className={classes.cardText} />
                                                    </IconButton>
                                                ) : null }
                                            </Fragment>
                                        }
                                        title={
                                            <Box className={`stickyPaper ${classes.rootBox}`} display="flex" alignItems="center">
                                                <Box className={`stickyPaper ${classes.handleBox}`}>
                                                    <Typography
                                                        variant = "h6"
                                                        component = { Link }
                                                        to = { `/users/${userHandle}` }
                                                    >
                                                        { userHandle } {/* deleteButton */}
                                                    </Typography>
                                                </Box>
                                                {/* <Box className={classes.handleBox}>
                                                    <Typography
                                                        variant = "body2"
                                                    >
                                                        <span className={classes.cardCreatedAt}><AccessTimeIcon className={classes.accessTime}/> {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} </span>
                                                    </Typography>
                                                </Box> */}
                                            </Box>
                                        }
                                        subheader={
                                            <Typography
                                                variant = "body2"
                                            >
                                                <span className={classes.cardCreatedAt}><AccessTimeIcon className={classes.accessTime}/> {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} </span>
                                            </Typography>
                                        }
                                    />
                                    {/* <Typography
                                        variant = "h6"
                                        component = { Link }
                                        to = { `/users/${userHandle}` }
                                        color = "primary"
                                    >
                                        { userHandle }
                                    </Typography>
                                    <Typography
                                        variant = "body2"
                                        color = "textSecondary"
                                    >
                                        { dayjs(createdAt).fromNow() }
                                    </Typography>
                                </CardHeader> */}
                                <CardContent className = { classes.content }>
                                    <Typography
                                        variant = "body2"
                                    >
                                        <span className={classes.cardText}>{ body }</span>
                                    </Typography>
                                </CardContent>
                                <Typography
                                    component="div"
                                    variant="body1"
                                    className={classes.cardMedia}
                                >
                                    <CardMedia
                                        image = { userImage }
                                        title = "Profile image"
                                        className = { classes.media }
                                    />
                                </Typography>
                                <CardActions disableSpacing>
                                    <LikeButton screamId = { screamId }/>
                                    <span className={classes.cardText}> { likeCount !== 0 ? likeCount : null } </span>
                                    <div className={classes.grow} />
                                    <ScreamDialog
                                        screamId = { screamId }
                                        userHandle = { userHandle }
                                        openDialog = { this.props.openDialog }
                                    />
                                    {/* <MyButton tip = "comments" >
                                        <CommentIcon className={classes.cardText} />
                                    </MyButton> */}
                                    <span className={classes.cardText}> { commentCount !== 0 ? commentCount : null } </span>
                                    <div className={classes.grow} />
                                    {/* <IconButton aria-label="like">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton> */}
                                    {/* { deleteButton } */}
                                    {/*<IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={this.handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>*/}
                                </CardActions>
                            {renderMenuMobile}
                            </Card>
                    </div>
                </>
            ) : (
                <>
                    <div className={`stickyPaper ${classes.sectionDesktop}`}>
                        <Card className = {`stickyPaper ${classes.desktopRoot2}` }>
                            <CardHeader
                                    avatar={
                                        <Avatar alt="Profile image" src={ userImage } className={classes.large} />
                                    }
                                    title={
                                        <Typography
                                            variant = "h6"
                                            component = { Link }
                                            to = { `/users/${userHandle}` }
                                        >
                                            { userHandle } {/* deleteButton */}
                                        </Typography>
                                    }
                                    subheader={
                                        <Typography
                                            variant = "body2"
                                        >
                                            <span className={classes.cardCreatedAt}><AccessTimeIcon className={classes.accessTime}/> {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} </span>
                                        </Typography>
                                    }
                                />
                                {/* <Typography
                                    variant = "h6"
                                    component = { Link }
                                    to = { `/users/${userHandle}` }
                                    color = "primary"
                                >
                                    { userHandle }
                                </Typography>
                                <Typography
                                    variant = "body2"
                                    color = "textSecondary"
                                >
                                    { dayjs(createdAt).fromNow() }
                                </Typography>
                            </CardHeader> */}
                            <CardContent className = { classes.content }>
                                <Typography
                                    variant = "body2"
                                >
                                    <span className={classes.cardText2}>{ body }</span>
                                </Typography>
                            </CardContent>
                            <Typography
                                component="div"
                                variant="body1"
                                className={classes.cardMedia}
                            >
                                <CardMedia
                                    image = { userImage }
                                    title = "Profile image"
                                    className = { classes.media }
                                />
                            </Typography>
                            <CardActions disableSpacing>
                                <LikeButton screamId = { screamId }/>
                                <span className={classes.cardText}> { likeCount !== 0 ? likeCount : null } </span>
                                <div className={classes.grow} />
                                <ScreamDialog
                                    screamId = { screamId }
                                    userHandle = { userHandle }
                                    openDialog = { this.props.openDialog }
                                />
                                {/* <MyButton tip = "comments" >
                                    <CommentIcon className={classes.cardText2} />
                                </MyButton> */}
                                <span className={classes.cardText}> { commentCount !== 0 ? commentCount : null } </span>
                                <div className={classes.grow} />
                                {/* <IconButton aria-label="like">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton> */}
                                {/* { deleteButton } */}
                                {/*<IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>*/}
                            </CardActions>
                        </Card>
                    </div>
                    <div className={`stickyPaper ${classes.sectionMobile}`}>
                        <Card className = {`stickyPaper ${classes.mobileRoot2}` }>
                            <CardHeader
                                    avatar={
                                        <Avatar alt="Profile image" src={ userImage } className={classes.large} />
                                    }
                                    title={
                                        <Typography
                                            variant = "h6"
                                            component = { Link }
                                            to = { `/users/${userHandle}` }
                                        >
                                            { userHandle } {/* deleteButton */}
                                        </Typography>
                                    }
                                    subheader={
                                        <Typography
                                            variant = "body2"
                                        >
                                            <span className={classes.cardCreatedAt}><AccessTimeIcon className={classes.accessTime}/> {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')} </span>
                                        </Typography>
                                    }
                                />
                                {/* <Typography
                                    variant = "h6"
                                    component = { Link }
                                    to = { `/users/${userHandle}` }
                                    color = "primary"
                                >
                                    { userHandle }
                                </Typography>
                                <Typography
                                    variant = "body2"
                                    color = "textSecondary"
                                >
                                    { dayjs(createdAt).fromNow() }
                                </Typography>
                            </CardHeader> */}
                            <CardContent className = { classes.content }>
                                <Typography
                                    variant = "body2"
                                >
                                    <span className={classes.cardText2}>{ body }</span>
                                </Typography>
                            </CardContent>
                            <Typography
                                component="div"
                                variant="body1"
                                className={classes.cardMedia}
                            >
                                <CardMedia
                                    image = { userImage }
                                    title = "Profile image"
                                    className = { classes.media }
                                />
                            </Typography>
                            <CardActions disableSpacing>
                                <LikeButton screamId = { screamId }/>
                                <span className={classes.cardText}> { likeCount !== 0 ? likeCount : null } </span>
                                <div className={classes.grow} />
                                <ScreamDialog
                                    screamId = { screamId }
                                    userHandle = { userHandle }
                                    openDialog = { this.props.openDialog }
                                />
                                {/* <MyButton tip = "comments" >
                                    <CommentIcon className={classes.cardText2} />
                                </MyButton> */}
                                <span className={classes.cardText}> { commentCount !== 0 ? commentCount : null } </span>
                                <div className={classes.grow} />
                                {/*<IconButton aria-label="like">
                                    <FavoriteIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                    <ShareIcon />
                                </IconButton> */}
                                {/* { deleteButton } */}
                                {/*<IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expanded,
                                    })}
                                    onClick={this.handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>*/}
                            </CardActions>
                        </Card>
                    </div>
                </>
            )}
            </Fragment>
        )
    }
}

Scream.propTypes = {
    openDialog: PropTypes.bool,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps)(withStyles(styles)(Scream))