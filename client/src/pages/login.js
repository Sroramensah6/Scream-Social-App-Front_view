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
// Redux stuff
import { connect } from 'react-redux';
import { loginUser } from '../redux/action/userAction'


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
        margin: '10px auto 10px auto'
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

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
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

        const userData = {
            email: this.state.email,
            password: this.state.password
        };
        this.props.loginUser(userData, this.props.history)
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
                        Login
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
                            <span className={classes.log}>Login</span>
                            {loading && (
                                <CircularProgress size={20} className={classes.progress} />
                            )}
                        </Button>
                        <br />
                        <br />
                        <br />
                        <small className={classes.cardText}>don't have an account? sign up <Link to="/signup">here</Link> </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}
Login.propTypes ={
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Login))

