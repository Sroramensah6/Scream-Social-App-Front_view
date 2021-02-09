import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
// Mui
import { withStyles, Grid } from '@material-ui/core';
// Redux
import { connect } from 'react-redux';
import { getScreams } from '../redux/action/dataAction'
// Component
import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';

const drawerWidth = 240;

const mobileDrawerWidth = 73;

const styles = (theme) => ({
    home: {
        marginTop: '60px',
        position: 'relative',
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
    },
    homeSm: {
        marginTop: '50px',
        position: 'relative',
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
    },
    contentSm: {
        width: '100%',
        // marginLeft: drawerWidth,
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
        position: 'relative'
    },
    home2: {
        marginTop: '60px',
        position: 'relative',
        backgroundColor: theme.palette.secondary.notAuth,
        height: '100%',
    },
    content: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
        position: 'relative'
    },
    mobileContent: {
        width: `calc(100% - ${mobileDrawerWidth}px)`,
        marginLeft: mobileDrawerWidth,
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
        position: 'relative'
    },
    content2: {
        width: '100%',
        backgroundColor: theme.palette.secondary.notAuth,
        height: '100%',
        position: 'relative'
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    sectionMobile: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'none',
        },
    },
    sectionMobileSm: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
        [theme.breakpoints.down('xs')]: {
            display: 'flex',
        },
    },
})

class Home extends Component {
    componentDidMount(){
        this.props.getScreams()
    }
    render() {
        const { classes, authenticated } = this.props
        const { screams, loading } = this.props.data;
        let recentScreamsMarkup = !loading ? ( screams === null ? (
            <p>No Data</p>
            ) : (
            screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
        )) : (
            <ScreamSkeleton />
        )
        return (
            <Fragment>
            {authenticated ? (
                <>
                    <div className={classes.sectionDesktop}>
                        <div className={`stickyPaper ${classes.content}`}>
                            <Grid className={`stickyPaper ${classes.home}`} container>
                                <Grid item sm={8} xs={12}>
                                    {recentScreamsMarkup}
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Profile />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className={`${classes.sectionMobile}`}>
                        <div className={`stickyPaper appear ${classes.mobileContent}`}>
                            <Grid className={`stickyPaper ${classes.home}`} container>
                                <Grid item sm={8} xs={12}>
                                    {recentScreamsMarkup}
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Profile />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className={classes.sectionMobileSm}>
                        <div className={`stickyPaper ${classes.contentSm}`}>
                            <Grid className={`stickyPaper ${classes.homeSm}`} container>
                                <Grid item sm={12} xs={12}>
                                    {recentScreamsMarkup}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className={classes.sectionDesktop}>
                        <div className={`stickyPaper ${classes.content2}`}>
                            <Grid className={`stickyPaper ${classes.home2}`} container>
                                <Grid item sm={8} xs={12}>
                                    {recentScreamsMarkup}
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Profile />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className={classes.sectionMobile}>
                        <div className={`stickyPaper appear ${classes.content2}`}>
                            <Grid className={`stickyPaper ${classes.home2}`} container>
                                <Grid item sm={8} xs={12}>
                                    {recentScreamsMarkup}
                                </Grid>
                                <Grid item sm={4} xs={12}>
                                    <Profile />
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className={classes.sectionMobileSm}>
                        <div className={`stickyPaper ${classes.content2}`}>
                            <Grid className={`stickyPaper ${classes.home2}`} container>
                                <Grid item sm={12} xs={12}>
                                    {recentScreamsMarkup}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </>
            )}
            </Fragment>
        )
    }
}

Home.propTypes = {
    getScreams: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state )=> ({
    data: state.data,
    authenticated: state.user.authenticated
});

const mapActionsToProps = {
    getScreams
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Home))