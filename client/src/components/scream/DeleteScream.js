import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import MyButton from '../../util/myButton'
// MUI Stuff
import { DeleteOutline } from '@material-ui/icons';
import { withStyles, Dialog, DialogTitle, DialogActions, Button } from '@material-ui/core';
// Redux
import { deleteScream } from '../../redux/action/dataAction'
import { connect } from 'react-redux';

const styles = (theme) => ({
    dialog: {
        backgroundColor: theme.palette.secondary.light
    },
    deleteButton: {
        position: 'absolute',
        left: '4%',
    },
    cardText: {
        color: theme.palette.primary.main
    },
})

class DeleteScream extends Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({ open: true });
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    deleteScream = () => {
        this.props.deleteScream(this.props.screamId)
        this.setState({
            open: false
        })
    }
    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <MyButton arialabel="delete" tip="Delete Scream"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                    classes={{
                        paper: `smoothTransition ${classes.dialog}`,
                    }}
                    // className={classes.dialog}
                >
                    <DialogTitle className={classes.cardText}>
                        Are you sure you want to delete this scream ?
                    </DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} className={classes.cardText}>
                            Cancel
                        </Button>
                        <Button onClick={this.deleteScream} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

DeleteScream.propTypes = {
    deleteScream: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}
const mapActionsToProps = {
    deleteScream
}
export default connect(null, mapActionsToProps)(withStyles(styles)(DeleteScream))
