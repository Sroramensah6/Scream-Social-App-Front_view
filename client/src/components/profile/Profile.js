import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import dayjs from 'dayjs'
// Component
// import EditDetails from './EditDetails'
// Mui Stuff
// import MuiLink  from '@material-ui/core/Link'
import { withStyles, Card, Paper, Typography, Button, /*IconButton, Tooltip*/ } from '@material-ui/core'
// Mui Icons
// import { LocationOn, CalendarToday } from '@material-ui/icons'
// import LinkIcon from '@material-ui/icons/Link'
// import EditIcon from '@material-ui/icons/Edit'
// import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// Redux
import { connect } from 'react-redux'
import { logoutUser, uploadImage } from '../../redux/action/userAction'
// Util
import ProfileSkeleton from '../../util/ProfileSkeleton';


const styles = (theme) => ({
    card: {
        boxShadow: 'none',
        maxWidth: 345,
        margin: theme.spacing(4),
        position:'sticky',
        top: 140,
        padding:20
    },
    button: {
        backgroundColor: theme.palette.primary.notAuthB
    },
    log: {
        color: theme.palette.secondary.notAuth
    },
    paper: {
        boxShadow: 'none',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        maxWidth: 345,
        margin: theme.spacing(4),
        position:'sticky',
        top: 140,
        padding:20,
        backgroundColor: theme.palette.secondary.light
    },
    mobilePaper: {
        boxShadow: 'none',
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        maxWidth: 345,
        margin: theme.spacing(4),
        position:'sticky',
        top: 140,
        padding:20,
        backgroundColor: theme.palette.secondary.light
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
        '& .profile-image2': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
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
    mobileProfile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image1': {
            width: 130,
            height: 130,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
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
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
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

class Profile extends Component {

    handleImageChange  = e => {
        const image = e.target.files[0]
        //  post to the server'
        const formData = new FormData();
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }

    handleEditImage = e => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }
    render() {
        const {
            classes,
            user: {
                credentials: {/* handle, createdAt,*/ imageUrl, /*bio, website, location*/ },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (authenticated ? (
            <>
                    <Paper className={`stickyPaper paperD ${classes.paper}`}>
                        <div className={classes.profile}>
                            <div className="image-wrapper">
                                <img src={imageUrl} alt="profile" className="profile-image2"/>
                                <input type="file" hidden="hidden" id="imageInput" onChange={this.handleImageChange} />
                                {/* <Tooltip title="Change profile picture" placement="top">
                                    <IconButton onClick={this.handleEditImage} className="button">
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                </Tooltip> */}
                            </div>
                            {/* <hr />
                            <div className="profile-details">
                                <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h6">
                                    @{handle}
                                </MuiLink>
                                <hr />
                                Bio{bio && <Typography variant="body2">{bio}</Typography>}
                                <hr />
                                {location && (
                                    <Fragment>
                                        <LocationOn color="primary" /> <span>{location}</span>
                                        <hr />
                                    </Fragment>
                                )}
                                {website && (
                                    <Fragment>
                                        <LinkIcon color="primary" />
                                        <a href={website} target="_blank" rel="noopener noreferrer">
                                            {' '}{website}
                                            <hr />
                                        </a>
                                    </Fragment>
                                )}
                                <CalendarToday color="primary" />{' '}
                                <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                            </div>
                            <Tooltip title="logout" placement="top">
                                <IconButton onClick={this.handleLogout}>
                                    <ExitToAppIcon />
                                </IconButton>
                            </Tooltip>
                            <EditDetails /> */}
                        </div>
                    </Paper>
                    <Paper className={`stickyPaper paperM ${classes.mobilePaper}`}>
                        <div className={classes.mobileProfile}>
                            <div className="image-wrapper">
                                <img src={imageUrl} alt="profile" className="profile-image1"/>
                                <input type="file" hidden="hidden" id="imageInput" onChange={this.handleImageChange} />
                                {/* <Tooltip title="Change profile picture" placement="top">
                                    <IconButton onClick={this.handleEditImage} className="button">
                                        <EditIcon color="primary"/>
                                    </IconButton>
                                </Tooltip> */}
                            </div>
                        </div>
                    </Paper>
            </>
        ) : (
            <Card className={classes.card}>
                <Typography variant="body" align="center">
                </Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" className={classes.button} component={Link} to="/login">
                        <span className={classes.log}>Login</span>
                    </Button>
                    <Button variant="contained" className={classes.button} component={Link} to="/signup">
                    <span className={classes.log}>Signup</span>
                    </Button>
                </div>
            </Card>
        )) : (<ProfileSkeleton />)

        return profileMarkup
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    logoutUser,
    uploadImage,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile))