import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// Component
import SideDrawer from './secondnav'
import Notifications from './Notifications';
import PostScream from '../scream/PostScream';
// Util
import MyButton from '../../util/myButton';
import EditProfileDetails from '../profile/editProfilePage';
// Redux
import { connect } from 'react-redux'
import { logoutUser } from '../../redux/action/userAction'
import { darkModeAction } from '../../redux/action/themeModeAction'
//Mui stuff
import Menu from '@material-ui/core/Menu';
import List from '@material-ui/core/List';
import Badge from '@material-ui/core/Badge';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import MenuItem from '@material-ui/core/MenuItem';
// import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Tooltip, Avatar } from '@material-ui/core';
import { fade, withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';


const drawerWidth = 240;

const styles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
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
    drawerPaper: {
        backgroundColor: theme.palette.secondary.light,
        width: drawerWidth,
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
        fontSize: '16px',
        paddingLeft: '17px'
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
        const { anchorEl, mobileMoreAnchorEl } = this.state
        const isMenuOpen = Boolean(anchorEl);
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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
                <MenuItem onClick={this.handleMenuClose}> <EditProfileDetails /> </MenuItem>
                <MenuItem onClick={this.handleMenuClose}>
                    <Link to={`/users/${handle}`}>
                        <IconButton color="inherit" className={classes.button}>
                            <RecordVoiceOverIcon className={classes.homeIcon} />
                            <p className={classes.ProText}>My account</p>
                        </IconButton>
                    </Link>
                </MenuItem>
            </Menu>
        );

        const mobileMenuId = 'primary-search-account-menu-mobile';
        const renderMobileMenu = (
            <Menu
                classes={{
                    paper: `smoothTransition ${classes.menu}`,
                }}
                anchorEl={mobileMoreAnchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={mobileMenuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMobileMenuOpen}
                onClose={this.handleMobileMenuClose}
            >
                <MenuItem>
                    <PostScream />
                    <p className={classes.cardText}>Post scream</p>
                </MenuItem>
                <MenuItem>
                    <Notifications />
                    <p className={classes.cardText}>Notifications</p>
                </MenuItem>
                <MenuItem>
                    <IconButton aria-label="show 4 new mails" color="inherit">
                        <Tooltip title="Mail">
                            <Badge badgeContent={4} color="secondary" >
                                <MailIcon className={`stickyPaper ${classes.mailIcon}`} />
                            </Badge>
                        </Tooltip>
                    </IconButton>
                    <p className={classes.cardText}>Mail</p>
                </MenuItem>
                <MenuItem onClick={this.handleMenuClose}> <EditProfileDetails /> </MenuItem>
                <MenuItem onClick={this.handleMenuClose}>
                    <Link to={`/users/${handle}`}>
                        <IconButton color="inherit" className={classes.button}>
                            <RecordVoiceOverIcon className={classes.homeIcon} />
                            <p className={classes.ProText}>My account</p>
                        </IconButton>
                    </Link>
                </MenuItem>
                <MenuItem onClick={this.handleLogout} >
                    <MyButton arialabel="logout" tip="Logout">
                        <ExitToAppIcon color="secondary"/>
                    </MyButton>
                    <p className={classes.cardText}>Logout</p>
                </MenuItem>
                {/* <MenuItem onClick={this.handleProfileMenuOpen}>
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
                    <p className={classes.cardText}>Profile</p>
                </MenuItem> */}
            </Menu>
        );
        return (
            <div className={classes.grow}>
                {/* <CssBaseline /> */}
                <AppBar className={`stickyPaper ${classes.appBar}`}>
                    <Toolbar>
                        <SideDrawer />
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
                        <div className={classes.grow} />
                        {/* <div className={classes.sectionDesktop}>
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
                        </div> */}
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
                        {/* <div className={classes.sectionMobile}>
                        { !loading ? (
                                <IconButton
                                    aria-label="show more"
                                    aria-controls={mobileMenuId}
                                    aria-haspopup="true"
                                    onClick={this.handleMobileMenuOpen}
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
                            )} */}
                            {/* <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon className={`stickyPaper ${classes.moreIcon}`} />
                            </IconButton> */}
                        {/* </div> */}
                    </Toolbar>
                </AppBar>
                {/* <Drawer
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
                </Drawer> */}
                {renderMobileMenu}
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