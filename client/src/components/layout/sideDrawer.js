import React, { Fragment } from 'react';
import clsx from 'clsx';
//Util
import Avatar from '../../util/Avatar';
import MyButton from '../../util/myButton';
//Component
import Person from './Person';
import Notifications from './Notifications';
import PostScream from '../scream/PostScream';
//Mui
import Logout from './Logout'
// MUi Stuff
import List from '@material-ui/core/List';
import Badge from '@material-ui/core/Badge';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import Divider from '@material-ui/core/Divider';
import { Tooltip, Link } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
    list: {
        width: drawerWidth,
        backgroundColor: theme.palette.secondary.light
    },
    fullList: {
        width: 'auto',
        backgroundColor: theme.palette.secondary.light
    },
    menuIcon: {
        color: theme.palette.primary.main,
    },
    homeIcon: {
        color: theme.palette.primary.main
    },
    cardText: {
        color: theme.palette.primary.main,
    },
    mailIcon: {
        color: theme.palette.primary.main
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    listItemText: {
        color: theme.palette.primary.main
    },
    drawerPaper: {
        backgroundColor: theme.palette.secondary.light,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    accountCircleIcon: {
        color: theme.palette.primary.main
    },
}));

function SideDrawer() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(`stickyPaper ${classes.list}`, {
                [`stickyPaper ${classes.fullList}`]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            // onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Avatar />
            <PostScream />
            <List>
                <Link to='/'>
                    <ListItem color="inherit" className={classes.button} button>
                        <ListItemIcon><HomeIcon className={`stickyPaper ${ classes.homeIcon}`}/></ListItemIcon>
                        <ListItemText className={`stickyPaper ${classes.cardText}`} primary="Home" />
                    </ListItem>
                </Link>
            </List>
            {/* <List>
                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon className={`stickyPaper ${classes.mailIcon}`} /> : <MailIcon className={`stickyPaper ${classes.mailIcon}`} />}</ListItemIcon>
                        <ListItemText className={`stickyPaper ${classes.listItemText}`} primary={text} />
                    </ListItem>
                ))}
            </List> */}
        </div>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <Fragment key={anchor}>
                    <IconButton
                        onClick={toggleDrawer(anchor, true)}
                        edge="start"
                        className={`stickyPaper ${classes.menuButton}`}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <Tooltip title="Menu">
                            <MenuIcon className={`stickyPaper ${classes.menuIcon}`} />
                        </Tooltip>
                    </IconButton>
                    <SwipeableDrawer
                        classes={{
                            paper: `stickyPaper ${classes.drawerPaper}`,
                        }}
                        // className={`stickyPaper ${classes.mobileDrawer}`}
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        {list(anchor)}
                        <Notifications />
                        <List>
                            <ListItem color="inherit" className={classes.button} button>
                                <ListItemIcon aria-label="show 4 new mails" color="inherit">
                                    <Badge badgeContent={4} color="secondary" >
                                        <MailIcon className={`stickyPaper ${classes.mailIcon}`} />
                                    </Badge>
                                </ListItemIcon>
                                <ListItemText className={`stickyPaper ${classes.cardText}`} primary="Mail" />
                            </ListItem>
                        </List>
                        {/* <MenuItem>
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge badgeContent={4} color="secondary" >
                                    <MailIcon className={`stickyPaper ${classes.mailIcon}`} />
                                </Badge>
                            </IconButton>
                            <p className={classes.cardText}>Mail</p>
                        </MenuItem> */}
                        <Logout />
                        <Divider />
                    </SwipeableDrawer>
                </Fragment>
            ))}
        </div>
    );
}


export default (SideDrawer)