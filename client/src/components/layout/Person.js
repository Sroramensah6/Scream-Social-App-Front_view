import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
//Mui
import PersonIcon  from '@material-ui/icons';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles, IconButton, Link, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
// Redux
import { connect } from 'react-redux';

const styles = (theme) => ({
    homeIcon: {
        color: theme.palette.primary.main
    },
    ProText: {
        color: theme.palette.primary.main,
        fontSize: '16px',
        paddingLeft: '17px'
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

class Person extends Component{

    render(){
        const {
            classes,
            user: {
                credentials: { handle }
            }
        } = this.props;

        return(
            <Fragment>
            <List>
                <Link to={`/users/${handle}`}>
                    <ListItem color="inherit" className={classes.button} button>
                        <ListItemIcon><PersonIcon className={classes.homeIcon} /></ListItemIcon>
                        <ListItemText className={`stickyPaper ${classes.ProText}`} primary="My account" />
                    </ListItem>
                </Link>
            </List>
                {/* <MenuItem>
                    <Link to={`/users/${handle}`}>
                        <IconButton>
                            <RecordVoiceOverIcon className={classes.homeIcon} />
                        </IconButton>
                        <p className={}></p>
                    </Link>
                </MenuItem> */}
            </Fragment>
        )
    }
}

Person.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Person))