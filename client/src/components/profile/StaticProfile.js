import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
// React-parallax
import { Parallax } from 'react-parallax';
// Mui Stuff
import { withStyles, Avatar, Typography } from '@material-ui/core';
import MuiLink  from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';


// const mobileDrawerWidth = 73;

const styles = (theme) => ({
    parallax: {
        height: 440,
        top: 0
    },
    // mobileAppBar: {
    //     width: `calc(100% - ${mobileDrawerWidth}px)`,
    //     marginLeft: mobileDrawerWidth,
    //     backgroundColor: theme.palette.secondary.light
    // },
    rootBox: {
        backgroundColor: theme.palette.secondary.light
    },
    rootBoxMobile: {
        backgroundColor: theme.palette.secondary.notAuth
    },
    invisibleSeparator: {
        border: "none",
        margin: 4
    },
    avatar: {
        width: '120px',
        height: '120px',
        position: 'relative',
        // border: `2px solid ${theme.palette.primary.main}`
    },
    avatarMobile: {
        width: '100px',
        height: '100px',
        position: 'relative',
        // border: `2px solid ${theme.palette.primary.main}`
    },
    avatarBox: {
        marginLeft: '80px',
        marginTop: '-60px',
    },
    avatarBoxMobile: {
        marginLeft: '20px',
        marginTop: '-60px',
    },
    icon: {
        fontSize: '13px'
    },
    handleBox: {
        marginLeft: '20px'
    },
    handleBoxMobile: {
        marginLeft: '10px'
    },
    detailBox: {
        marginLeft: '20px'
    },
    paper: {
        maxWidth: 345,
        margin: theme.spacing(4),
        position:'fixed',
        padding:20
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'initial',
        },
    },
    sectionMobile: {
        display: 'initial',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
})

class StaticProfile extends Component {
    handleImageChange = e => {
        const image = e.target.files[0]
        //  post to the server'
        const formData = new FormData();
        formData.append('image', image, image.name)
        this.props.uploadProfileImageHeader(formData)
    }

    handleEditImage = e => {
        const fileInput = document.getElementById('profileImageInput')
        fileInput.click();
    }

    render() {
        const {
            classes,
            profile: {
                imageUrl,
                handle,
                profileImageHeaderUrl
            }, authenticated
        } = this.props;
        return (
            <Fragment>
                {authenticated ? (
                    <>
                        <div className={classes.sectionDesktop}>
                            <div className="stickyPaper parallaxAbout">
                                <Parallax
                                    bgImage={profileImageHeaderUrl}
                                    strength={-200}
                                    bgImageAlt={handle}
                                    blur={{ min: -65, max: 15 }}
                                    className= "parallax"
                                >
                                    <div />
                                </Parallax>
                            </div>
                            <Box className={`stickyPaper ${classes.rootBox}`} display="flex" alignItems="center">
                                <Box className={classes.avatarBox}>
                                    <Avatar className={classes.avatar} alt="Profile image" src={ imageUrl }/>
                                </Box>
                                <Box className={classes.handleBox}>
                                    <Typography
                                        component={Link}
                                        variant="h6"
                                    >
                                        <span className={`stickyPaper ${classes.cardText}`}>{ handle }</span>
                                    </Typography>
                                    <Typography
                                        display="block"
                                        variant="caption"
                                        color="textSecondary"
                                    >
                                        <MuiLink variant="body2">
                                            @{ handle }
                                        </MuiLink>
                                    </Typography>
                                </Box>
                            </Box>
                        </div>
                        <div className={classes.sectionMobile}>
                            <div className={classes.mobileAppBar}>
                                <div className="stickyPaper parallaxM">
                                    <Parallax
                                        bgImage={profileImageHeaderUrl}
                                        strength={-200}
                                        bgImageAlt={handle}
                                        blur={{ min: -65, max: 15 }}
                                        className= "parallaxMobile"
                                    >
                                        <div />
                                    </Parallax>
                                </div>
                                <Box className={`stickyPaper ${classes.rootBox}`} display="flex" alignItems="center">
                                    <Box className={classes.avatarBoxMobile}>
                                        <Avatar className={classes.avatarMobile} alt="Profile image" src={ imageUrl }/>
                                    </Box>
                                    <Box className={classes.handleBoxMobile}>
                                        <Typography
                                            component={Link}
                                            variant="h6"
                                        >
                                            <span className={`stickyPaper ${classes.cardText}`}>{ handle }</span>
                                        </Typography>
                                        <Typography
                                            display="block"
                                            variant="caption"
                                            color="textSecondary"
                                        >
                                            <MuiLink variant="body2">
                                                @{ handle }
                                            </MuiLink>
                                        </Typography>
                                    </Box>
                                </Box>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={classes.sectionDesktop}>
                            <div className="stickyPaper parallaxAbout">
                                <Parallax
                                    bgImage={profileImageHeaderUrl}
                                    strength={-200}
                                    bgImageAlt={handle}
                                    blur={{ min: -65, max: 15 }}
                                    className= "parallax"
                                >
                                    <div />
                                </Parallax>
                            </div>
                            <Box className={`stickyPaper ${classes.rootBoxMobile}`} display="flex" alignItems="center">
                                <Box className={classes.avatarBox}>
                                    <Avatar className={classes.avatar} alt="Profile image" src={ imageUrl }/>
                                </Box>
                                <Box className={classes.handleBox}>
                                    <Typography
                                        component={Link}
                                        variant="h6"
                                    >
                                        <span className={`stickyPaper ${classes.cardText}`}>{ handle }</span>
                                    </Typography>
                                    <Typography
                                        display="block"
                                        variant="caption"
                                        color="textSecondary"
                                    >
                                        <MuiLink variant="body2">
                                            @{ handle }
                                        </MuiLink>
                                    </Typography>
                                </Box>
                            </Box>
                        </div>
                        <div className={classes.sectionMobile}>
                            <div className="stickyPaper parallaxM">
                                <Parallax
                                    bgImage={profileImageHeaderUrl}
                                    strength={-200}
                                    bgImageAlt={handle}
                                    blur={{ min: -65, max: 15 }}
                                    className= "parallaxMobile"
                                >
                                    <div />
                                </Parallax>
                            </div>
                            <Box className={`stickyPaper ${classes.rootBoxMobile}`} display="flex" alignItems="center">
                                <Box className={classes.avatarBoxMobile}>
                                    <Avatar className={classes.avatarMobile} alt="Profile image" src={ imageUrl }/>
                                </Box>
                                <Box className={classes.handleBoxMobile}>
                                    <Typography
                                        component={Link}
                                        variant="h6"
                                    >
                                        <span className={`stickyPaper ${classes.cardText}`}>{ handle }</span>
                                    </Typography>
                                    <Typography
                                        display="block"
                                        variant="caption"
                                        color="textSecondary"
                                    >
                                        <MuiLink variant="body2">
                                            @{ handle }
                                        </MuiLink>
                                    </Typography>
                                </Box>
                            </Box>
                        </div>
                    </>
                )}
            </Fragment>
        );
    }
}

StaticProfile.propTypes = {
    classes: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state )=> ({
    authenticated: state.user.authenticated
});


export default connect(mapStateToProps)(withStyles(styles)(StaticProfile))