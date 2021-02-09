import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
// Redux
import { connect } from 'react-redux';
// Mui Icons
import { LocationOn, CalendarToday } from '@material-ui/icons'
// import EmailIcon from '@material-ui/icons/Email';
import LinkIcon from '@material-ui/icons/Link'
// Mui Stuff
import { withStyles, Paper, Typography } from '@material-ui/core';

const styles = (theme) => ({
    stickyPaper: {
        boxShadow: 'none',
        maxWidth: 345,
        margin: theme.spacing(1),
        position:'sticky',
        top: 140,
        padding:20,
        zIndex: '1',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        backgroundColor: theme.palette.secondary.light,
    },
    stickyMobile: {
        boxShadow: 'none',
        maxWidth: 345,
        margin: 0,
        position:'sticky',
        top: 140,
        padding:10,
        zIndex: '1',
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        backgroundColor: theme.palette.secondary.light,
    },
    stickyNotAuth: {
        boxShadow: 'none',
        maxWidth: 345,
        margin: theme.spacing(4),
        position:'sticky',
        top: 140,
        padding:20,
        zIndex: '1',
        backgroundColor: theme.palette.secondary.notAuth,
    },
    cardText: {
        color: theme.palette.primary.main
    },
    cardNotAuth: {
        color: '#1c2025'
    },
    profileIcon: {
        color: theme.palette.primary.main
    },
    profileNotAuth: {
        color: '#1c2025'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            margin: 20,
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
    // sectionDesktop: {
    //     display: 'none',
    //     [theme.breakpoints.up('md')]: {
    //         display: 'flex',
    //     },
    // },
    // sectionMobile: {
    //     display: 'flex',
    //     [theme.breakpoints.up('md')]: {
    //         display: 'none',
    //     },
    // },
})

class StaticProfile extends Component {
    render() {
        const {
            classes,
            status: {
                bio,
                website,
                createdAt,
                // email,
                location
            }, authenticated
        } = this.props
        return (
            <Fragment>
                {authenticated ? (
                    <>
                        <Paper className={`stickyPaper ${classes.stickyPaper}`}>
                            <div className={classes.profile}>
                                <div className="profile-details">
                                    { bio && (
                                        <Typography variant="body2">
                                            <span className={classes.cardText}>{bio}</span>
                                            <hr />
                                        </Typography>
                                    )}
                                    {/* { email && (
                                        <Typography variant="body2">
                                            <EmailIcon className={classes.profileIcon} />
                                            <span className={classes.cardText}>{email}</span>
                                            <hr />
                                        </Typography>
                                    ) } */}
                                    { location && (
                                        <Typography variant="body2">
                                            <LocationOn className={classes.profileIcon} />
                                            <span className={classes.cardText}>{location}</span>
                                            <hr />
                                        </Typography>
                                    ) }
                                    {   website && (
                                        <Typography variant="body2">
                                            <LinkIcon className={classes.profileIcon} />
                                            <a href={website} className={classes.cardText} target="_blank" rel="noopener noreferrer">
                                                {' '}{website}
                                                <hr />
                                            </a>
                                        </Typography>
                                    )   }
                                    <CalendarToday className={classes.profileIcon} />{' '}
                                    <span className={classes.cardText}>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                                </div>
                            </div>
                        </Paper>
                        <Paper className={`stickyPaper dontappear ${classes.stickyMobile}`}>
                            <div className={classes.profile}>
                                <div className="image-wrapper">
                                    { bio && (
                                        <Typography variant="body2">
                                            <span className={classes.cardText}>{bio}</span>
                                            <hr />
                                        </Typography>
                                    )}
                                    {/* { email && (
                                        <Typography variant="body2">
                                            <EmailIcon className={classes.profileIcon} />
                                            <span className={classes.cardText}>{email}</span>
                                            <hr />
                                        </Typography>
                                    ) } */}
                                    { location && (
                                        <Typography variant="body2">
                                            <LocationOn className={classes.profileIcon} />
                                            <span className={classes.cardText}>{location}</span>
                                            <hr />
                                        </Typography>
                                    ) }
                                    {   website && (
                                        <Typography variant="body2">
                                            <LinkIcon className={classes.profileIcon} />
                                            <a href={website} className={classes.cardText} target="_blank" rel="noopener noreferrer">
                                                {' '}{website}
                                                <hr />
                                            </a>
                                        </Typography>
                                    )   }
                                    <CalendarToday className={classes.profileIcon} />{' '}
                                    <span className={classes.cardText}>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                                </div>
                            </div>
                        </Paper>
                    </>
                ) : (
                    <Paper className={`stickyPaper ${classes.stickyNotAuth}`}>
                        <div className={classes.profile}>
                            <div className="profile-details">
                                { bio && (
                                    <Typography variant="body2">
                                        <span className={classes.cardNotAuth}>{bio}</span>
                                        <hr />
                                    </Typography>
                                ) }
                                {/* { email && (
                                    <Typography variant="body2">
                                        <EmailIcon className={classes.profileNotAuth} />
                                        <span className={classes.cardNotAuth}>{email}</span>
                                        <hr />
                                    </Typography>
                                ) } */}
                                { location && (
                                    <Typography variant="body2">
                                        <LocationOn className={classes.profileNotAuth} />
                                        <span className={classes.cardNotAuth}>{location}</span>
                                        <hr />
                                    </Typography>
                                ) }
                                {   website && (
                                    <Typography variant="body2">
                                        <LinkIcon className={classes.profileNotAuth} />
                                        <a href={website} className={classes.cardNotAuth} target="_blank" rel="noopener noreferrer">
                                            {' '}{website}
                                            <hr />
                                        </a>
                                    </Typography>
                                )   }
                                <CalendarToday className={classes.profileNotAuth} />{' '}
                                <span className={classes.cardNotAuth}>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                            </div>
                        </div>
                    </Paper>
                )}
            </Fragment>
        );
    }
}

StaticProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    status: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state )=> ({
    authenticated: state.user.authenticated
});


export default connect(mapStateToProps)(withStyles(styles)(StaticProfile))