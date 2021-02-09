import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
//import AppIcon from '../images/logo.svg'

// MUI Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

// Redux Stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/action/userAction';

const styles = (theme) => ({
    form: {
        textAlign: 'center',
        marginTop: '120px',
        backgroundColor: theme.palette.secondary.notAuth,
    },
    image: {
        margin: '20px auto 20px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto',
        color: theme.palette.primary.main
    },
    cardText: {
        color: theme.palette.primary.main
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
    marginTop: 20,
    position: 'relative',
    backgroundColor: theme.palette.primary.notAuthB
    },
    log: {
        color: theme.palette.secondary.notAuth
    },
    customError: {
        fontSize: '0.8rem',
        marginTop: 10,
        color: theme.palette.secondary.main
    },
    err: {
        color: theme.palette.secondary.main
    },
    progress: {
        position: 'absolute',
    }
})


class signup extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    };

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.UI.errors) {
            return{
                errors: nextProps.UI.errors
            }
        }
	return null;
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        };
        this.props.signupUser(newUserData, this.props.history)
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const { classes, UI: { loading } } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm >
                    {/*<img src={AppIcon} alt="react" className={classes.image}/>*/}
                    <Typography variant="h5" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            className={classes.textField}
                            helperText={errors.email}
                            error={errors.email ? true : false}
                            value={this.state.email}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            className={classes.textField}
                            helperText={errors.password}
                            error={errors.password ? true : false}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            label="Confirm Password"
                            className={classes.textField}
                            helperText={errors.confirmPassword}
                            error={errors.confirmPassword ? true : false}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            id="handle"
                            name="handle"
                            type="text"
                            label="Handle"
                            className={classes.textField}
                            helperText={errors.handle}
                            error={errors.handle ? true : false}
                            value={this.state.handle}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        {<span className={classes.err}>errors.general</span> && (
                            <Typography variant="body2" className={classes.customError}>
                                <span className={classes.err}>{errors.general}</span>
                            </Typography>
                        )}
                        <Button
                            type = "submit"
                            variant="contained"
                            className={classes.button}
                            disabled={loading}
                        >
                            <span className={classes.log}>Signup</span>
                            {loading && (
                                <CircularProgress size={20} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <br />
                        <br />
                        <small className={classes.cardText}>Already have an account? login <Link to="/login">here</Link> </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}
signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionsProps)(withStyles(styles)(signup))
