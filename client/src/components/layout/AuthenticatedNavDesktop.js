import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Component
// import Logout from './Logout';
import LogoutSideNav from './LogoutSideNav';
import Notifications from './Notifications';
import PostScream from '../scream/PostScream';
import NotificationSideNav from './notificationSideNav'
import PostScreamSideNav from '../scream/postScreamSideNav';
import EditProfileDetails from '../profile/editProfilePage';
import EditDetailsSideNav from '../profile/editProfileSideNav';
// Util
import MyButton from '../../util/myButton';
// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/action/userAction';
import { darkModeAction } from '../../redux/action/themeModeAction';
//Mui stuff
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
// import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
// import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon  from '@material-ui/icons/Person';
import { Tooltip, Avatar } from '@material-ui/core';
import InputBase from '@material-ui/core/InputBase';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { fade, withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';


const drawerWidth = 240;

const mobileDrawerWidth = 73;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: theme.palette.secondary.light
    },
    mobileAppBar: {
        width: `calc(100% - ${mobileDrawerWidth}px)`,
        marginLeft: mobileDrawerWidth,
        backgroundColor: theme.palette.secondary.light
    },
    menu: {
        backgroundColor: theme.palette.secondary.light
    },
    // menu1: {
    //     position:' relative',
    //     top: '0px',
    //     borderRadius: '0px',
    //     // height: '124px',
    //     backgroundColor: theme.palette.secondary.light
    // },
    toggleButton:{
        backgroundColor: theme.palette.secondary.dark
    },
    toggleButton2:{
        backgroundColor: theme.palette.secondary.sun
    },
    brightness3Icon: {
        color: theme.palette.primary.contrastText
    },
    wbSunnyIcon: {
        color: theme.palette.primary.dark
    },
    menuIcon: {
        color: theme.palette.primary.main,
    },
    homeIcon: {
        color: theme.palette.primary.main
    },
    mailIcon: {
        color: theme.palette.primary.main
    },
    accountCircleIcon: {
        color: theme.palette.primary.main
    },
    moreIcon: {
        color: theme.palette.primary.main
    },
    listItemText: {
        color: theme.palette.primary.main
    },
    drawer: {
        backgroundColor: theme.palette.secondary.light,
        width: drawerWidth,
        flexShrink: 0,
    },
    mobileDrawer: {
        backgroundColor: theme.palette.secondary.light,
        width: mobileDrawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        backgroundColor: theme.palette.secondary.light,
        width: drawerWidth,
    },
    mobileDrawerPaper: {
        backgroundColor: theme.palette.secondary.light,
        width: mobileDrawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    grow: {
        flexGrow: 1,
    },
    cardText: {
        color: theme.palette.primary.main,
    },
    ProText: {
        color: theme.palette.primary.main,
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    button: {
        position: 'relative',
        float: 'right',
        borderRadius: '0%'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        color: theme.palette.primary.main,
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        color: theme.palette.primary.main,
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus' : {
                width: '20ch'
            }
        },
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

class PrimarySearchAppBar extends Component {

    state = {
        selected: false,
        toggle: false,
        anchorEl: null,
        mobileMoreAnchorEl: null
    }

    handleThemeMode = (value) => {
        // Stotring the to localStorage
        window.localStorage.setItem('theme', value)
        this.props.darkModeAction(value);
        this.setState({
            selected: true
        })
    }

    handleProfileMenuOpen = (event) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    }

    handleMobileMenuClose = () => {
        this.setState({
            mobileMoreAnchorEl: null
        });
    };

    handleMenuClose = () => {
        this.setState({
            anchorEl: null
        });
        this.handleMobileMenuClose();
    };

    handleMobileMenuOpen = (event) => {
        this.setState({
            mobileMoreAnchorEl: event.currentTarget
        });
    };

    handleLogout = () => {
        this.props.logoutUser();
    }

    render(){
        const {
            classes,
            user: {
                credentials: { imageUrl, handle },
                loading
            }
        } = this.props;
        const { anchorEl } = this.state
        const isMenuOpen = Boolean(anchorEl);
        // const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);, mobileMoreAnchorEl

        const menuId = 'primary-search-account-menu';
        const renderMenu = (
            <Menu
                classes={{
                    paper: `smoothTransition ${classes.menu}`,
                }}
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={this.handleMenuClose}
            >
                <MenuItem onClick={this.handleMenuClose}>
                    <EditProfileDetails />
                </MenuItem>
                <MenuItem onClick={this.handleMenuClose}>
                    <Link to={`/users/${handle}`}>
                        <List>
                            <ListItem color="inherit" className={classes.button} button>
                                <ListItemIcon>
                                    <PersonIcon className={classes.homeIcon} />
                                </ListItemIcon>
                                <ListItemText className={`stickyPaper ${classes.cardText}`} primary="My account" />
                            </ListItem>
                        </List>
                    </Link>
                </MenuItem>
            </Menu>
        );

        // const mobileMenuId = 'primary-search-account-menu-mobile';
        // const renderMobileMenu = (
        //     <Menu
        //         classes={{
        //             paper: `smoothTransition ${classes.menu}`,
        //         }}
        //         anchorEl={mobileMoreAnchorEl}
        //         anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        //         id={mobileMenuId}
        //         keepMounted
        //         transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        //         open={isMobileMenuOpen}
        //         onClose={this.handleMobileMenuClose}
        //     >
        //         <MenuItem onClick={this.handleMenuClose}>
        //             <List>
        //                 <Link to={`/users/${handle}`}>
        //                     <ListItem color="inherit" className={classes.button} button>
        //                         <ListItemIcon><PersonIcon className={classes.homeIcon} /></ListItemIcon>
        //                         <ListItemText className={`stickyPaper ${classes.ProText}`} primary="My account" />
        //                     </ListItem>
        //                 </Link>
        //             </List>
        //         </MenuItem>
        //         <MenuItem onClick={this.handleMenuClose}> <EditProfileDetails /> </MenuItem>
        //         <MenuItem onClick={this.handleMenuClose}>
        //             <Notifications />
        //         </MenuItem>
        //         <MenuItem onClick={this.handleMenuClose}>
        //             <List>
        //                 <ListItem color="inherit" className={classes.button} button>
        //                     <ListItemIcon>
        //                         <Badge badgeContent={4} color="secondary" >
        //                             <MailIcon className={`stickyPaper ${classes.mailIcon}`} />
        //                         </Badge>
        //                     </ListItemIcon>
        //                     <ListItemText className={`stickyPaper ${classes.cardText}`} primary="Mail" />
        //                 </ListItem>
        //             </List>
        //         </MenuItem>
        //         <MenuItem onClick={this.handleMenuClose}>
        //             <PostScream />
        //         </MenuItem>
        //         <MenuItem >
        //             <Link to={`/users/${handle}`}>
        //                 <IconButton color="inherit" className={classes.button}>
        //                     <RecordVoiceOverIcon className={classes.homeIcon} />
        //                     <p className={classes.ProText}>My account</p>
        //                 </IconButton>
        //             </Link>
        //         </MenuItem>
        //         <MenuItem>
        //             <Logout />
        //         </MenuItem>
        //         <MenuItem onClick={this.handleProfileMenuOpen}>
        //             { !loading ? (
        //                 <IconButton
        //                     edge="end"
        //                     aria-label="account of current user"
        //                     aria-controls={menuId}
        //                     aria-haspopup="true"
        //                     onClick={this.handleProfileMenuOpen}
        //                     color="inherit"
        //                 >
        //                     <Tooltip title="Profile">
        //                         <Avatar alt={handle} src={imageUrl} className={classes.small} />
        //                     </Tooltip>
        //                 </IconButton>
        //                 ) : (
        //                 <IconButton
        //                     edge="end"
        //                     aria-label="account of current user"
        //                     aria-haspopup="true"
        //                     color="inherit"
        //                 >
        //                     <Tooltip title="Profile">
        //                         <AccountCircle className={`stickyPaper ${classes.accountCircleIcon}`} />
        //                     </Tooltip>
        //                 </IconButton>
        //             )}
        //             <p className={classes.cardText}>Profile</p>
        //         </MenuItem>
        //     </Menu>
        //);
        return (
            <div className={classes.grow}>
                <div className={classes.sectionDesktop}>
                    <AppBar className={`stickyPaper ${classes.appBar}`}>
                        <Toolbar>
                            <ToggleButtonGroup size="small">
                                <Tooltip title="Dark mode">
                                    <ToggleButton className={`stickyPaper ${classes.toggleButton}`}  onClick={() => this.handleThemeMode('dark')} value="left">
                                        <Brightness3Icon className={`stickyPaper ${classes.brightness3Icon}`} fontSize="small" />
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Day mode">
                                    <ToggleButton className={`stickyPaper ${classes.toggleButton2}`} onClick={() => this.handleThemeMode('light')} value="center">
                                        <WbSunnyIcon className={`stickyPaper ${classes.wbSunnyIcon}`} fontSize="small" />
                                    </ToggleButton>
                                </Tooltip>
                            </ToggleButtonGroup>
                            {/* <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                            >
                                <MenuIcon className={classes.menuIcon} />
                            </IconButton> */}
                            {/*<Typography className={classes.title} variant="h6" noWrap>
                                Material-UI
                            </Typography>*/}
                            <div className={classes.grow} />
                            <div className="nav-container">
                                <div className={`stickyPaper ${classes.search}`}>
                                    <div className={`${classes.searchIcon} stickyPaper searchIcon`}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </div>
                            <PostScream />
                            <Link to='/'>
                                <MyButton tip="Home">
                                    <HomeIcon className={`stickyPaper ${ classes.homeIcon}`}/>
                                </MyButton>
                            </Link>
                            <Notifications />
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Tooltip title="Mail">
                                    <Badge badgeContent={4} color="secondary" >
                                        <MailIcon className={`stickyPaper ${classes.mailIcon}`} />
                                    </Badge>
                                </Tooltip>
                            </IconButton>
                            <MyButton onClick={this.handleLogout} arialabel="logout" tip="Logout">
                                <ExitToAppIcon color="secondary"/>
                            </MyButton>
                            { !loading ? (
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <Tooltip title="Profile">
                                        <Avatar alt={handle} src={imageUrl} className={classes.small} />
                                    </Tooltip>
                                </IconButton>
                            ) : (
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Tooltip title="Profile">
                                        <AccountCircle className={`stickyPaper ${classes.accountCircleIcon}`} />
                                    </Tooltip>
                                </IconButton>
                            )}
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.sectionMobile}>
                    <AppBar className={`stickyPaper ${classes.mobileAppBar}`}>
                        <Toolbar>
                            <ToggleButtonGroup size="small">
                                <Tooltip title="Dark mode">
                                    <ToggleButton className={`stickyPaper ${classes.toggleButton}`}  onClick={() => this.handleThemeMode('dark')} value="left">
                                        <Brightness3Icon className={`stickyPaper ${classes.brightness3Icon}`} fontSize="small" />
                                    </ToggleButton>
                                </Tooltip>
                                <Tooltip title="Day mode">
                                    <ToggleButton className={`stickyPaper ${classes.toggleButton2}`} onClick={() => this.handleThemeMode('light')} value="center">
                                        <WbSunnyIcon className={`stickyPaper ${classes.wbSunnyIcon}`} fontSize="small" />
                                    </ToggleButton>
                                </Tooltip>
                            </ToggleButtonGroup>
                            {/* <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                            >
                                <MenuIcon className={classes.menuIcon} />
                            </IconButton> */}
                            {/*<Typography className={classes.title} variant="h6" noWrap>
                                Material-UI
                            </Typography>*/}
                            <div className={classes.grow} />
                            <div className="nav-container">
                                <div className={`stickyPaper ${classes.search}`}>
                                    <div className={`${classes.searchIcon} stickyPaper searchIcon`}>
                                        <SearchIcon />
                                    </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </div>
                            </div>
                            { !loading ? (
                                <Avatar alt={handle} src={imageUrl} className={classes.small} />
                            ) : (
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircle className={`stickyPaper ${classes.accountCircleIcon}`} />
                                </IconButton>
                            )}
                        </Toolbar>
                    </AppBar>
                </div>
                <div className={classes.sectionDesktop}>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: `stickyPaper ${classes.drawerPaper}`,
                        }}
                        anchor="left"
                    >
                        <div className={classes.toolbar} />
                        <Divider />
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon className={`stickyPaper ${classes.moreIcon}`} /> : <MailIcon className={classes.moreIcon} />}</ListItemIcon>
                                    <ListItemText className={`stickyPaper ${classes.listItemText}`} primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon className={classes.moreIcon} /> : <MailIcon className={classes.moreIcon} />}</ListItemIcon>
                                    <ListItemText className={classes.listItemText} primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <div className="sideProfile">
                            { !loading ? (
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <Tooltip title="Profile">
                                        <Avatar alt={handle} src={imageUrl} className={classes.small} />
                                    </Tooltip>
                                </IconButton>
                            ) :  (
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Tooltip title="Profile">
                                        <AccountCircle className={classes.accountCircleIcon} />
                                    </Tooltip>
                                </IconButton>
                            )}
                        </div>
                    </Drawer>
                </div>
                <div className={classes.sectionMobile}>
                    <Drawer
                        variant="permanent"
                        className={classes.mobileDrawer}
                        classes={{
                            paper: `stickyPaper ${classes.mobileDrawerPaper}`,
                        }}
                        anchor="left"
                    >
                        <div className={classes.toolbar} />
                        <Divider />
                        <List>
                            <ListItem button>
                                <Link to={`/users/${handle}`}>
                                    <Tooltip title="My Account">
                                        <ListItemIcon>
                                            <PersonIcon className={`stickyPaper ${classes.homeIcon}`}/>
                                        </ListItemIcon>
                                    </Tooltip>
                                </Link>
                            </ListItem>
                            <ListItem button>
                                <EditDetailsSideNav />
                            </ListItem>
                            <ListItem button>
                                <NotificationSideNav />
                            </ListItem>
                            <ListItem button>
                                <Tooltip title="Messages">
                                    <ListItemIcon>
                                        <Badge badgeContent={4} color="secondary" >
                                            <MailIcon className={`stickyPaper ${classes.mailIcon}`} />
                                        </Badge>
                                    </ListItemIcon>
                                </Tooltip>
                            </ListItem>
                            <ListItem button>
                                <PostScreamSideNav />
                            </ListItem>
                            <ListItem button>
                                <LogoutSideNav />
                            </ListItem>
                        </List>
                        <List>
                            <ListItem>
                                <div className="sideProfile">
                                    { !loading ? (
                                        <ListItemIcon
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls={menuId}
                                            aria-haspopup="true"
                                            onClick={this.handleProfileMenuOpen}
                                            color="inherit"
                                        >
                                            <Avatar alt={handle} src={imageUrl} className={classes.small} />
                                        </ListItemIcon>
                                    ) :  (
                                        <ListItemIcon
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-haspopup="true"
                                            color="inherit"
                                        >
                                            <AccountCircle className={classes.accountCircleIcon} />
                                        </ListItemIcon>
                                    )}
                                </div>
                            </ListItem>
                        </List>
                    </Drawer>
                </div>
                {/* <div className={classes.sectionMobile}>
                    <Drawer
                        className={classes.drawer}
                        variant="permanent"
                        classes={{
                            paper: `stickyPaper ${classes.drawerPaper}`,
                        }}
                        anchor="left"
                    >
                        <div className={classes.toolbar} />
                        <Divider />
                        <List>
                            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon className={`stickyPaper ${classes.moreIcon}`} /> : <MailIcon className={classes.moreIcon} />}</ListItemIcon>
                                    <ListItemText className={`stickyPaper ${classes.listItemText}`} primary={text} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                        <div className="sideProfile">
                            { !loading ? (
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={this.handleProfileMenuOpen}
                                    color="inherit"
                                >
                                    <Tooltip title="Profile">
                                        <Avatar alt={handle} src={imageUrl} className={classes.small} />
                                    </Tooltip>
                                </IconButton>
                            ) :  (
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <Tooltip title="Profile">
                                        <AccountCircle className={classes.accountCircleIcon} />
                                    </Tooltip>
                                </IconButton>
                            )}
                        </div>
                    </Drawer>
                </div> */}
                {/* {renderMobileMenu} */}
                {renderMenu}
            </div>
        );
    }
}

PrimarySearchAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    darkModeAction: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    logoutUser,
    darkModeAction
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PrimarySearchAppBar))