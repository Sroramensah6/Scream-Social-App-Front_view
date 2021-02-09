import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import MyButton from '../../util/myButton';
// Mui stuff
import {
    withStyles,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    CircularProgress,
    List,
    Tooltip,
    // Link,
    // ListItem,
    ListItemIcon,
    // ListItemText
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
// import MenuItem from '@material-ui/core/MenuItem';
// import IconButton from '@material-ui/core/IconButton';
// Redux'
import { connect } from 'react-redux';
import { postScream, clearErrors } from '../../redux/action/dataAction';

const styles = theme => ({
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10,
        color: theme.palette.primary.main
    },
    form: {
        textAlign: 'center'
    },
    progressSpinner: {
        position: 'absolute',
    },
    textField: {
        margin: '10px auto 10px auto',
        color: theme.palette.primary.main
    },
    textLog: {
        color: theme.palette.primary.main
    },
    closeButton: {
        position: 'absolute',
        left: '90%',
        top: '3%',
        color: theme.palette.primary.main
    },
    add: {
        color: theme.palette.primary.main
    },
    cardText: {
        color: theme.palette.primary.main
    },
    closeIcon: {
        color: theme.palette.primary.main
    },
    submit: {
        color: theme.palette.primary.main
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
});

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading) {
            this.setState({ body: '', open: false, errors: {} });
        }
    }
    handleOpen = () => {
        this.setState({
            open: true,
            errors: {}
        });
    }
    handleClose = () => {
	this.props.clearErrors()
        this.setState({ open: false, errors: {} });
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.postScream({ body: this.state.body });
    }
    render() {
        const { errors } = this.state
        const { classes, UI: { loading } } = this.props
        return (
            <Fragment>
                <>
                    <List onClick={this.handleOpen}>
                        <Tooltip title="Post">
                            <ListItemIcon>
                                <AddIcon className={`stickyPaper ${classes.add}`}/>
                            </ListItemIcon>
                        </Tooltip>
                    </List>
                    {/* <MenuItem onClick={this.handleOpen} >
                        <IconButton aria-label="Logout"
                            aria-haspopup="true"
                        >
                        <AddIcon className={`stickyPaper ${classes.add}`}/>
                        </IconButton>
                        <p className={classes.cardText}>Poet</p>
                    </MenuItem> */}
                    <Dialog
                        className="stickyPaper"
                        open={this.state.open}
                        onClose={this.handleClose}
                        fullWidth
                        maxWidth="sm"
                    >
                        <MyButton
                            arialabel="close button"
                            tip="Close"
                            onClick={this.handleClose}
                            tipClassName={classes.closeButton}
                        >
                            <CloseIcon className={classes.closeIcon}/>
                        </MyButton>
                        <DialogTitle className={classes.dialogContent}>Post a new scream</DialogTitle>
                        <DialogContent className={classes.dialogContent}>
                            <form onSubmit={this.handleSubmit}>
                                <TextField
                                    name="body"
                                    type="text"
                                    label="Scream"
                                    classes={{
                                        paper: `smoothTransition ${classes.textLog}`,
                                    }}
                                    multiline
                                    rows="3"
                                    placeholder="Scream at your fellow apes"
                                    error={errors.body ? true : false}
                                    helperText={errors.body}
                                    className={classes.textField}
                                    onChange={this.handleChange}
                                    fullWidth
                                />
                                <Button
                                    type="submit"
                                    className={classes.submitButton}
                                    disabled={loading}
                                >
                                        <span className={classes.submit}>Submit</span>
                                        {loading && (
                                            <CircularProgress size={20} className={classes.progressSpinner} />
                                        )}
                                    </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    UI: state.UI
});

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream))