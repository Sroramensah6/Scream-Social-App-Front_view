import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
// Dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI stuff
import { withStyles, Menu, MenuItem, Tooltip, IconButton, Badge, Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ChatIcon from '@material-ui/icons/Chat'
//Redux
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/action/userAction'

const styles = (theme) => ({
    notificationsIcon: {
        color: theme.palette.primary.main
    },
    notiDialog: {
        backgroundColor: theme.palette.secondary.light
    },
    dialogText: {
        color: theme.palette.primary.main
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    cardText: {
        color: theme.palette.primary.main
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
})
class Notifications extends Component {
    state = {
        anchorEl: null
    }
    handleOpen = (event) => {
        this.setState({ anchorEl: event.target })
    }
    handleClose = () => {
        this.setState({ anchorEl: null});
    }

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter((not) => !not.read)
            .map((not) => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    }

    render() {
        const { classes } = this.props
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl

        dayjs.extend(relativeTime);

        let notificationsIcon;
        if(notifications && notifications.length > 0) {
            notifications.filter((not) => not.read === false).length > 0
                ? (notificationsIcon = (
                    <Badge badgeContent={notifications.filter((not) => not.read === false).length}
                        color="secondary">
                            <NotificationsIcon className={`stickyPaper ${classes.notificationsIcon}`}/>
                        </Badge>
                )) : (
                    notificationsIcon = <NotificationsIcon className={`stickyPaper ${classes.notificationsIcon}`}/>
                )
        } else {
            notificationsIcon = <NotificationsIcon className={`stickyPaper ${classes.notificationsIcon}`}/>
        }

        let notificationsMarkup =
            notifications && notifications.length > 0 ? (
                notifications.map((not) => {
                    const verb = not.type === 'like' ? 'liked' : 'commented on';
                    const time = dayjs(not.createdAt).fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary';
                    const icon = not.type === 'like' ? (
                        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
                    ) : (
                        <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                    )
                    return (
                        <MenuItem key={not.createdAt} onClick={this.handleClose}>
                            {icon}
                            <Typography
                                component={Link}
                                color="default"
                                variant="body1"
                                to={`/users/${not.recipient}/scream/${not.screamId}`}
                            >
                                {not.sender} {verb} your scream {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem className={classes.notiDialog} onClick={this.handleClose}>
                    <span className={classes.dialogText}>You have no notifications yet</span>
                </MenuItem>
            )

        return(
            <Fragment>
                <>
                    <div className={classes.sectionDesktop}>
                        <Tooltip placement="top" title="Notifications">
                            <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleOpen}
                            >
                                {notificationsIcon}
                            </IconButton>
                        </Tooltip>
                        <Menu
                            classes={{
                                paper: `smoothTransition ${classes.notiDialog}`,
                            }}
                            // className={classes.notiDialog}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            onEntered={this.onMenuOpened}
                        >
                            {notificationsMarkup}
                        </Menu>
                    </div>
                    <div className={classes.sectionMobile}>
                        <List onClick={this.handleOpen}>
                            <ListItem color="inherit" className={classes.button} button>
                                <ListItemIcon>{notificationsIcon}</ListItemIcon>
                                <ListItemText className={`stickyPaper ${classes.cardText}`} primary="Notifications" />
                            </ListItem>
                        </List>
                        {/* <MenuItem button  onClick={this.handleOpen}>
                            <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleOpen}
                            >
                            </IconButton>
                            <p className={classes.cardText}></p>
                        </MenuItem>
                        <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            onClick={this.handleOpen}
                        >
                            {notificationsIcon}
                        </IconButton> */}
                        <Menu
                            classes={{
                                paper: `smoothTransition ${classes.notiDialog}`,
                            }}
                            // className={classes.notiDialog}
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={this.handleClose}
                            onEntered={this.onMenuOpened}
                        >
                            {notificationsMarkup}
                        </Menu>
                    </div>
                </>
            </Fragment>
        )
    }
}

Notifications.propTypes = {
    classes: PropTypes.object.isRequired
}

Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
});

export default connect(mapStateToProps, { markNotificationsRead })(withStyles(styles)(Notifications))