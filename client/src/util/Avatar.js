import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs'
// Redux
import { connect } from 'react-redux';
//Mui

import PersonIcon  from '@material-ui/icons/Person';
import MenuItem from '@material-ui/core/MenuItem';
import MuiLink  from '@material-ui/core/Link';
import LinkIcon from '@material-ui/icons/Link';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { LocationOn, CalendarToday } from '@material-ui/icons';
import { withStyles, Avatar, IconButton, Typography, Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';

const styles = (theme) => ({
    homeIcon: {
        color: theme.palette.primary.main
    },
    ProText: {
        color: theme.palette.primary.main
    },
    large: {
        width: '150px',
        height: '150px',
        position: 'relative',
        left: '20%',
    },
    button: {
        width: '100%',
        position: 'relative',
    },
    handleBox: {
        // marginLeft: '90px',
        width: '100%',
        textAlign: 'center',
    },
    sideProfile: {
        position: 'relative'
    },
    cardText: {
        color: theme.palette.primary.main
    },
    profileIcon: {
        color: theme.palette.primary.main
    },
    accountCircleIcon: {
        left: '20%',
        width: '150px',
        height: '150px',
        position: 'relative',
        color: theme.palette.primary.main,
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                top: '80%',
                left: '70%',
                position: 'absolute',
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            maxWidth: '100%',
            objectFit: 'cover',
            borderRadius: '50%',
        },
        '& .profile-details': {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            },
            '& a': {
                color: theme.palette.primary.main
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&: hover' : {
                cursor: 'pointer',
            }
        }
    },
});

class AvatarProfile extends Component {
    render() {
        const {
            classes,
            user: {
                credentials: {
                    imageUrl,
                    handle,
                    bio,
                    website,
                    createdAt,
                    email,
                    location
                },
                loading
            }
        } = this.props;

        return (
            <Fragment>
                <div className={`${classes.sideProfile}`}>
                    { !loading ? (
                        <Typography
                            component="div"
                            color="inherit"
                            className={classes.button}
                        >
                            <Avatar alt={handle} src={imageUrl} className={classes.large} />
                            <Box color="inherit" display="flex" alignItems="center">
                                <Box  className={classes.handleBox}>
                                {/* <Typography variant="h6" >
                                    <span className={`stickyPaper ${classes.cardText}`}>{ handle }</span>
                                </Typography> */}
                                <Typography
                                    display="block"
                                    variant="h6"
                                    className={`stickyPaper ${classes.cardText}`}
                                    component = { Link }
                                    to = { `/users/${handle}` }
                                >
                                    <MuiLink variant="body2">
                                        @{ handle }
                                    </MuiLink>
                                </Typography>
                                </Box>
                            </Box>
                            <br />
                            {/* <br />
                            <Typography component="div" variant="body2">
                                <div className={classes.profile}>
                                    <div className="profile-details">
                                        { bio && <Typography variant="body2"> <span className={classes.cardText}>{bio}</span> </Typography> }
                                        <hr />
                                        { location && (
                                            <Fragment>
                                                <LocationOn className={classes.profileIcon} /> <span className={classes.cardText}>{location}</span>
                                                <hr />
                                            </Fragment>
                                        )}
                                        { website && (
                                            <Fragment>
                                                <LinkIcon className={classes.profileIcon} />
                                                <a href={website} className={classes.cardText} target="_blank" rel="noopener noreferrer">
                                                    {' '}{website}
                                                    <hr />
                                                </a>
                                            </Fragment>
                                        )}
                                        <CalendarToday className={classes.profileIcon} />{' '}
                                        <span className={classes.cardText}>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                                                <hr />
                                        { email && (
                                            <Fragment>
                                                <EmailIcon className={classes.profileIcon} /> <span className={classes.cardText}>{email}</span>
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                            </Typography> */}
                        </Typography>
                    ) :  (
                        <>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle className={classes.accountCircleIcon} />
                            </IconButton>
                            <br />
                        </>
                    )}
                    <br />
                </div>
                <Divider />
                <List>
                    <Link to={`/users/${handle}`}>
                        <ListItem color="inherit" className={classes.button} button>
                            <ListItemIcon><PersonIcon className={classes.homeIcon} /></ListItemIcon>
                            <ListItemText className={`stickyPaper ${classes.ProText}`} primary="My account" />
                        </ListItem>
                    </Link>
                </List>
            </Fragment>
        );
    }
}

AvatarProfile.propTypes = {
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(AvatarProfile));