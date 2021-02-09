import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// Mui stuff
import { withStyles, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Box, Avatar, Button, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
// React-parallax
import { Parallax } from 'react-parallax';
// Redux'
import { connect } from 'react-redux';
import { editUserDetails, uploadProfileImageHeader, uploadImage } from '../../redux/action/userAction';
// Util
import Success from '../../util/successMessage';

const styles = (theme) => ({
    header: {
        position: 'relative',
    },
    form: {
        textAlign: 'center'
    },
    textField: {
        margin: '10px auto 10px auto',
        color: theme.palette.primary.main
    },
    button: {
        position: 'relative',
        float: 'right',
        borderRadius: '0%'
    },
    phone: {
        color: theme.palette.primary.main
    },
    progress: {
        position: 'absolute',
    },
    avatar: {
        position: 'relative',
        width: '80px',
        height:' 80px'
    },
    avatarBox: {
        position: 'absolute',
        left: '4%',
        bottom: '10%'
    },
    homeIcon: {
        color: theme.palette.primary.main
    },
    cardText: {
        color: theme.palette.primary.main
    },
    ProText: {
        color: theme.palette.primary.main,
        fontSize: '17px',
        paddingLeft: '17px'
    },
    dialogContent: {
        backgroundColor: theme.palette.secondary.light
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

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    handleHeaderImageChange  = e => {
        const image = e.target.files[0]
        //  post to the server'
        const formData = new FormData();
        formData.append('image', image, image.name)
        this.props.uploadProfileImageHeader(formData)
    }

    handleEditImageHeader = () => {
        const fileInput = document.getElementById('profileImageInput')
        fileInput.click();
    }

    handleImageChange  = e => {
        const image = e.target.files[0]
        //  post to the server'
        const formData = new FormData();
        formData.append('image', image, image.name)
        this.props.uploadImage(formData)
    }

    handleEditImage = () => {
        const fileInput = document.getElementById('imageInput')
        fileInput.click();
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            location: this.state.location
        };
        this.props.editUserDetails(userDetails)
        this.handleClose();
    }
    handleOpen = () => {
        this.setState({ open: true });
        this.mapUserDetailsToState(this.props.credentials)
    }
    handleClose = () => {
        this.setState({ open: false })
    }
    componentDidMount(){
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
    }
    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            email: credentials.email ? credentials.email : '',
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }
    render() {
        const { classes, success,
            user: {
                credentials: { profileImageHeaderUrl, imageUrl }
            }
        } = this.props;
        return (
            <Fragment>
                <>
                    <div className={classes.sectionDesktop}>
                        <List>
                            <ListItem onClick={this.handleOpen} color="inherit" className={classes.button} button>
                                <ListItemIcon>
                                    <EditIcon className={classes.homeIcon} />
                                </ListItemIcon>
                                <ListItemText className={`stickyPaper ${classes.cardText}`} primary="Edit profile" />
                            </ListItem>
                        </List>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            fullWidth
                            maxWidth='sm'>
                            <DialogTitle className={classes.dialogContent}>Edit your details</DialogTitle>
                            <DialogContent className={classes.dialogContent}>
                                <div className={classes.header}>
                                    <div className="parallaxEdit">
                                        <Parallax
                                            bgImage={profileImageHeaderUrl}
                                            strength={-200}
                                            bgImageAlt="Team"
                                            blur={{ min: -65, max: 15 }}
                                            className= "parallaxEdit"
                                        >
                                            <div />
                                        </Parallax>
                                        <input type="file" hidden="hidden" id="profileImageInput" onChange={this.handleHeaderImageChange} />
                                        <Tooltip title="Change profile header picture" placement="top">
                                            <IconButton onClick={this.handleEditImageHeader} className="EditImageButton">
                                                <PhotoCameraIcon className={classes.photo} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <Box display="flex" alignItems="center">
                                        <Box className={classes.avatarBox}>
                                            <Avatar className={classes.avatar} alt="Profile image" src={ imageUrl }/>
                                            <input type="file" hidden="hidden" id="imageInput" onChange={this.handleImageChange} />
                                            <Tooltip title="Change profile picture" placement="top">
                                                <IconButton onClick={this.handleEditImage} className="EditProfileImageButton">
                                                    <PhotoCameraIcon className={classes.photo} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                                <form>
                                    <TextField
                                        name="bio"
                                        type="text"
                                        label="Bio"
                                        multiline
                                        rows="2"
                                        placeholder="A short bio about yourself"
                                        className={classes.TextField}
                                        value={this.state.bio}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name="email"
                                        type="email"
                                        label="Email"
                                        placeholder='Post your email here'
                                        className={classes.TextField}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name="website"
                                        type="text"
                                        label="Website"
                                        placeholder='Post your wedsite here'
                                        className={classes.TextField}
                                        value={this.state.website}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name="location"
                                        type="text"
                                        label="location"
                                        placeholder="Your location"
                                        className={classes.TextField}
                                        value={this.state.location}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions  className={classes.dialogContent}>
                                <Button onClick={this.handleClose} className={classes.cardText}>
                                    Cancel
                                </Button>
                                <Button onClick={this.handleSubmit} color="secondary">
                                    Save{success && (
                                <Success />
                            )}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div className={classes.sectionMobile}>
                        <List onClick={this.handleOpen} className={classes.button}>
                            <ListItem color="inherit" className={classes.button} button>
                                <ListItemIcon><EditIcon className={classes.homeIcon} /></ListItemIcon>
                                <ListItemText className={`stickyPaper ${classes.cardText}`} primary="Edit profile" />
                            </ListItem>
                        </List>
                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            fullWidth
                            maxWidth='sm'>
                            <DialogTitle className={classes.dialogContent}>Edit your details</DialogTitle>
                            <DialogContent className={classes.dialogContent}>
                                <div className={classes.header}>
                                    <div className="parallaxEdit">
                                        <Parallax
                                            bgImage={profileImageHeaderUrl}
                                            strength={-200}
                                            bgImageAlt="Team"
                                            blur={{ min: -65, max: 15 }}
                                            className= "parallaxEdit"
                                        >
                                            <div />
                                        </Parallax>
                                        <input type="file" hidden="hidden" id="profileImageInput" onChange={this.handleHeaderImageChange} />
                                        <Tooltip title="Change profile header picture" placement="top">
                                            <IconButton onClick={this.handleEditImageHeader} className="EditImageButton">
                                                <PhotoCameraIcon className={classes.photo} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <Box display="flex" alignItems="center">
                                        <Box className={classes.avatarBox}>
                                            <Avatar className={classes.avatar} alt="Profile image" src={ imageUrl }/>
                                            <input type="file" hidden="hidden" id="imageInput" onChange={this.handleImageChange} />
                                            <Tooltip title="Change profile picture" placement="top">
                                                <IconButton onClick={this.handleEditImage} className="EditProfileImageButton">
                                                    <PhotoCameraIcon className={classes.photo} />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                    <br />
                                    <br />
                                    <br />
                                </div>
                                <form>
                                    <TextField
                                        name="bio"
                                        type="text"
                                        label="Bio"
                                        multiline
                                        rows="2"
                                        placeholder="A short bio about yourself"
                                        className={classes.TextField}
                                        value={this.state.bio}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name="email"
                                        type="email"
                                        label="Email"
                                        placeholder='Post your email here'
                                        className={classes.TextField}
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name="website"
                                        type="text"
                                        label="Website"
                                        placeholder='Post your wedsite here'
                                        className={classes.TextField}
                                        value={this.state.website}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                    <TextField
                                        name="location"
                                        type="text"
                                        label="location"
                                        placeholder="Your location"
                                        className={classes.TextField}
                                        value={this.state.location}
                                        onChange={this.handleChange}
                                        fullWidth
                                    />
                                </form>
                            </DialogContent>
                            <DialogActions  className={classes.dialogContent}>
                                <Button onClick={this.handleClose} className={classes.cardText}>
                                    Cancel
                                </Button>
                                <Button onClick={this.handleSubmit} color="secondary">
                                    Save{success && (
                                <Success />
                            )}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </>
            </Fragment>
        )
    }
}

EditDetails.propTypes= {
    classes: PropTypes.object.isRequired,
    uploadImage : PropTypes.func.isRequired,
    credentials: PropTypes.object.isRequired,
    editUserDetails : PropTypes.func.isRequired,
    uploadProfileImageHeader : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    credentials: state.user.credentials,
    success: state.user.success,
    user: state.user
});

const mapActionsToProps = {
    uploadProfileImageHeader,
    editUserDetails,
    uploadImage
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails))
