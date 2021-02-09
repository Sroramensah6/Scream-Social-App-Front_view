import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//Mui
// import MenuItem from '@material-ui/core/MenuItem';, IconButton Badge,
import { withStyles, List, ListItemIcon, Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/action/userAction';

const styles = (theme) => ({
    cardText: {
        color: theme.palette.primary.main
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

class Logout extends Component{

    handleLogout = () => {
        this.props.logoutUser();
    }

    render(){

        const { classes } = this.props;

        return(
            <Fragment>
                <>
                    <List onClick={this.handleLogout} color="inherit" className={classes.button} button>
                        <Tooltip title="Logout">
                            <ListItemIcon color="inherit">
                                <ExitToAppIcon color="secondary"/>
                            </ListItemIcon>
                        </Tooltip>
                    </List>
                    {/* <MenuItem onClick={this.handleLogout} >
                        <IconButton aria-label="Logout"
                            aria-haspopup="true"
                            // onClick={this.handleOpen}
                        >
                            <ExitToAppIcon color="secondary"/>
                        </IconButton>
                        <p className={classes.cardText}>Logout</p>
                    </MenuItem> */}
                </>
            </Fragment>
        )
    }
}

Logout.propTypes = {
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired
}
const mapStateToProps = (state) => ({
    user: state.user,
});
const mapActionsToProps = {
    logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Logout))