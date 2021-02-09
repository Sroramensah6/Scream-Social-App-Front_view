import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
// Mui stuff
import { withStyles, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@material-ui/core'
// Redux'
import { connect } from 'react-redux'
import { editUserDetails } from '../../redux/action/userAction'
// Mui Icons
import EditIcon from '@material-ui/icons/Edit'
// Util
import Success from '../../util/successMessage'

const styles = {
    form: {
        textAlign: 'center'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
    position: 'relative',
    float: 'right'
    }
}

class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
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
            website: credentials.website ? credentials.website : '',
            location: credentials.location ? credentials.location : ''
        })
    }
    render() {
        const { classes, success } = this.props
        return (
            <Fragment>
                <Tooltip title="Edit details" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary" />
                    </IconButton>
                </Tooltip>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth='sm'>
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
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
                    <DialogActions>
                        <Button onClick={this.handleClose} color='primary'>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color='primary'>
                            Save{success && (
                        <Success />
                    )}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

EditDetails.propTypes= {
    credentials: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    editUserDetails : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    credentials: state.user.credentials,
    success: state.user.success
});

const mapActionsToProps = {
    editUserDetails
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditDetails))
