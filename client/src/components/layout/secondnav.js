import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom'
//Util
import Avatar from '../../util/Avatar';
//Component
import Logout from './Logout'
import Notifications from './NotificationMobile';
import PostScream from '../scream/PostScream';
import EditPage from '../profile/editProfilePage';
// MUi Stuff
import List from '@material-ui/core/List';
import Badge from '@material-ui/core/Badge';
import Drawer from '@material-ui/core/Drawer';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    hide: {
        display: 'none',
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
    drawerPaper: {
        backgroundColor: theme.palette.secondary.light,
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        minHeight: '50px',
        justifyContent: 'flex-end',
    },
    drawerText: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 3),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    toolbar: theme.mixins.toolbar,
    accountCircleIcon: {
        color: theme.palette.primary.main
    },
    listItemText: {
        color: theme.palette.primary.main
    },
    title: {
        flexGrow: 1,
        alignSelf: 'flex-end',
    },
}));

export default function NavBar() {
    const classes = useStyles();
    //const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                onKeyDown={handleDrawerClose}
                className={clsx(`stickyPaper ${classes.menuButton}`, open && `{stickyPaper ${classes.fullList}`)}
            >
                <MenuIcon className={`stickyPaper ${classes.menuIcon}`} />
            </IconButton>
            <Drawer
                classes={{
                    paper: `stickyPaper ${classes.drawerPaper}`,
                }}
                role="presentation"
                variant="persistent"
                anchor="left"
                open={open}
                onClick={handleDrawerClose}
            >
                <div className={classes.drawerHeader}>
                    <IconButton color="secondary" onClick={handleDrawerClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
                <Avatar />
                <EditPage />
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
                <PostScream />
                <List>
                    <Link to='/'>
                        <ListItem color="inherit" className={classes.button} button>
                            <ListItemIcon><HomeIcon className={`stickyPaper ${ classes.homeIcon}`}/></ListItemIcon>
                            <ListItemText className={`stickyPaper ${classes.cardText}`} primary="Home" />
                        </ListItem>
                    </Link>
                </List>
                <Logout />
            </Drawer>
        </Fragment>
    );
}