import React, { Component} from 'react'
import PropTypes from 'prop-types'
//Redux
import { submitComment } from '../../redux/action/dataAction'
import { connect } from 'react-redux'
// MUI
import {
    withStyles,
    Grid,
    TextField,
    Button
} from '@material-ui/core';


const styles = (theme) => ({
    button: {
        position: 'relative',
        marginTop: 10,
        color: theme.palette.primary.main,
        marginBottom: 10
    },
    progressSpinner: {
        position: 'absolute',
    },
    form: {
        textAlign: 'center'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    invisibleSeparator: {
        border: "none",
        margin: 4
    },
    commentIcon: {
        color: theme.palette.primary.main,
    },
    dialogContent: {
        backgroundColor: theme.palette.secondary.light
    },
})

class CommentForm extends Component {
    state = {
        body: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.UI.errors) {
            this.setState({ errors: nextProps.UI.errors })
        }
        if (!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: '' })
        }
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleSubmit = (event) => {
        event.preventDefault()
        this.props.submitComment(this.props.screamId, { body: this.state.body })
    }
    render() {
        const { classes, authenticated } = this.props
        const { errors } = this.state
        const commentFormMarkup = authenticated ? (
            <Grid item sm={12} className={classes.dialogContent} style={{ textAlign: 'center'}}>
                <form onSubmit={this.handleSubmit}>
                    <TextField
                        name="body"
                        type="text"
                        label="Comment on scream"
                        error={errors.comment ? true : false}
                        helperText={errors.comment}
                        value={this.state.body}
                        onChange={this.handleChange}
                        fullWidth
                        className={classes.textField}
                    />
                    <Button
                        type="submit"
                        className={classes.button}
                    >
                        Submit
                    </Button>
                </form>
                <hr className={classes.visibleSeparator} />
            </Grid>
        ) : null
        return commentFormMarkup;
    }
}

CommentForm.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    submitComment: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated,
    UI: state.UI,
});
export default connect(mapStateToProps, { submitComment })(withStyles(styles)(CommentForm))