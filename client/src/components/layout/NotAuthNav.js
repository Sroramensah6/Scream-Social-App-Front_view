import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// Mui stuff
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { Tooltip, IconButton, withStyles } from '@material-ui/core';
// Mui Icons
import HomeIcon from '@material-ui/icons/Home'

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: theme.palette.secondary.notAuth,
    },
    icon: {
        color: theme.palette.primary.notAuthB
    },
    button: {
        backgroundColor: theme.palette.primary.notAuthB
    },
    log: {
        color: theme.palette.secondary.notAuth
    },
})


class Navbar extends Component {
    render(){
        const { classes } = this.props;
        return (
            <AppBar className={classes.appBar}>
                <Toolbar className="nav-container">
                    <Fragment>
                        <Button variant="contained" className={classes.button} component={Link} to="/login">
                            <span className={classes.log}>Login</span>
                        </Button>
                        <Link to='/'>
                            <Tooltip title="Home">
                                <IconButton>
                                    <HomeIcon className={classes.icon}/>
                                </IconButton>
                            </Tooltip>
                        </Link>
                        <Button variant="contained" className={classes.button} component={Link} to="/signup">
                            <span className={classes.log}>Signup</span>
                        </Button>
                    </Fragment>
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Navbar)