import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
// Dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
// MUI stuff
import { withStyles, Menu, MenuItem, Badge, Typography, List, ListItemIcon, Tooltip } from '@material-ui/core';
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
    handleOpenMobile = (event) => {
        this.setState({ anchorEl: event.target })
    }
    handleCloseMobile = () => {
        this.setState({ anchorEl: null});
    }
    onMenuOpenedMobile = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter((not) => !not.read)
            .map((not) => not.notificationId);
        this.props.markNotificationsRead(unreadNotificationsIds);
    }
    render() {
        const { classes } = this.props
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl
        const menuId = 'notificationMobile';

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

        let notificationsMarkupMobile =
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
                        <MenuItem key={not.createdAt} onClick={this.handleCloseMobile}>
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
                <MenuItem className={classes.notiDialog} onClick={this.handleCloseMobile}>
                    <span className={classes.dialogText}>You have no notifications yet</span>
                </MenuItem>
            )
        return(
            <Fragment>
                <>
                    <List onClick={this.handleOpenMobile} >
                        <Tooltip title="Notification">
                            <ListItemIcon>{notificationsIcon}</ListItemIcon>
                        </Tooltip>
                    </List>
                    {/* <MenuItem>
                        <IconButton aria-label="Notification" aria-owns={anchorEl ? 'simple-menu' : undefined}
                            aria-haspopup="true"
                            // onClick={this.handleOpen}
                        >
                        </IconButton>
                        <p className={classes.cardText}></p>
                    </MenuItem> */}
                    <Menu
                        classes={{
                            paper: `smoothTransition ${classes.notiDialog}`,
                        }}
                        id={menuId}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.handleCloseMobile}
                        onEntered={this.onMenuOpenedMobile}
                    >
                        {notificationsMarkupMobile}
                    </Menu>
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