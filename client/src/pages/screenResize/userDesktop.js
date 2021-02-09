import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
import axios from 'axios';
// Mui Stuff
import { withStyles, Grid, Paper, Card, CardHeader, CardContent } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
// Redux
import { connect } from 'react-redux';
import { getUserData } from '../../redux/action/dataAction';
// Components
import Scream from '../../components/scream/Scream'
import StaticProfile from '../../components/profile/StaticProfile'
import ProfileStatus from '../../components/profile/ProfileStatus'

const drawerWidth = 240;

const mobileDrawerWidth = 73;

const styles = (theme) => ({
    paper: {
        maxWidth: 345,
        margin: theme.spacing(4),
        position:'sticky',
        top: 140,
        padding:20,
        zIndex: '1',
        backgroundColor: theme.palette.secondary.light
    },
    cardText: {
        color: theme.palette.primary.main
    },
    parallax: {
        height: '446px'
    },
    card: {
        maxWidth: 500,
        margin: theme.spacing(4),
        backgroundColor: theme.palette.secondary.light
    },
    media: {
        height: 390,
    },
    grid: {
        top: '0px',
        position: 'relative',
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
    },
    gridItem: {
        position: 'relative'
    },
    content: {
        top: '0px',
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
        position: 'relative'
    },
    mobileContent: {
        top: '0px',
        width: `calc(100% - ${mobileDrawerWidth}px)`,
        marginLeft: mobileDrawerWidth,
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
        position: 'relative'
    },
    content2: {
        top: '40px',
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
        position: 'relative'
    },
    skeleton: {
        width: '100%',
        height: '530px',
        top: '-77px',
        position: 'relative'
    },
    avatar: {
        width: '120px',
        height: '120px',
        position: 'relative',
        border: '2px solid #fff'
    },
    avatarBox: {
        marginLeft: '80px',
        marginTop: '-60px',
    },
    handleBox: {
        marginLeft: '20px'
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            padding: '5rem',
            position: 'relative',
            '& button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
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

class User extends Component {
    state = {
        profile: null,
        screamIdParam: null,
        status: null
    }
    componentDidMount(){
        const handle = this.props.match.params.handle;
        const screamId = this.props.match.params.screamId;

        if(screamId) this.setState({ screamIdParam: screamId})

        this.props.getUserData(handle);
        axios
            .get(`/user/${handle}`)
            .then((res) => {
                this.setState({
                    profile: res.data.user,
                    status: res.data.user
                })
            })
            .catch((err)=> console.error(err));
    }
    render() {
        const { screamIdParam } = this.state
        const { classes, authenticated } = this.props
        const { screams, loading } = this.props.data;
        const screamMarkup = loading ? (
            Array.from({ length: 5 }).map((item, index) => (
                <Card className={classes.card}>
                    <CardHeader
                        avatar={
                            <Skeleton animation="wave" variant="circle" width={40} height={40} />
                        }
                        title={
                            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                        }
                        subheader={<Skeleton animation="wave" height={10} width="40%" /> }
                    />
                    <Skeleton animation="wave" variant="rect" className={classes.media} />
                    <CardContent>
                        <Fragment>
                            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                            <Skeleton animation="wave" height={10} width="80%" />
                        </Fragment>
                    </CardContent>
                </Card>
            ))
        ) : screams === null ? (
            <Paper className={`stickyPaper${classes.paper}`}>
                <div className={classes.profile}>
                    <div className="profile-details">
                        <span className={classes.cardText}>No scream from the user</span>
                    </div>
                </div>
            </Paper>
        ) : !screamIdParam ? (
            screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
        ) : (
            screams.map((scream) => {
                if(scream.screamId !== screamIdParam )
                    return  <Scream key={scream.screamId} scream={scream} />
                else return  <Scream key={scream.screamId} scream={scream} openDialog/>
            })
        )
        return (
            <Fragment >
            {authenticated ? (
                <>
                    <div className={classes.sectionDesktop}>
                        <div className={classes.content}>
                            <div>
                                {this.state.profile === null ? (
                                    <>
                                        <div>
                                            <div className={classes.parallax}>
                                                <Skeleton animation="wave" className={classes.skeleton} alt="profile" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <StaticProfile profile={this.state.profile}/>
                                )}
                            </div>
                            <Grid container className={`stickyPaper ${classes.grid}`}>
                                <Grid item className={classes.gridItem} sm={8} xs={12} >
                                    { screamMarkup }
                                </Grid>
                                <Grid item className={classes.gridItem} sm={4} xs={12}>
                                    {this.state.status === null ? (
                                        <Paper className={classes.paper}>
                                            <div className={classes.profile}>
                                                <div className="image-wrapper">
                                                        <Skeleton animation="wave" alt="profile" variant="circle" width={132} height={132} className="profile-image" />
                                                </div>
                                            </div>
                                        </Paper>
                                    ) : (
                                        <ProfileStatus status={this.state.status} />
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className={classes.sectionMobile}>
                        <div className={classes.mobileContent}>
                            <div>
                                {this.state.profile === null ? (
                                    <>
                                        <div>
                                            <div className={classes.parallax}>
                                                <Skeleton animation="wave" className={classes.skeleton} alt="profile" />
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <StaticProfile profile={this.state.profile}/>
                                )}
                            </div>
                            <Grid container className={`stickyPaper ${classes.grid}`}>
                                <Grid item className={classes.gridItem} sm={8} xs={12} >
                                    { screamMarkup }
                                </Grid>
                                <Grid item className={classes.gridItem} sm={4} xs={12}>
                                    {this.state.status === null ? (
                                        <Paper className={classes.paper}>
                                            <div className={classes.profile}>
                                                <div className="image-wrapper">
                                                        <Skeleton animation="wave" alt="profile" variant="circle" width={132} height={132} className="profile-image" />
                                                </div>
                                            </div>
                                        </Paper>
                                    ) : (
                                        <ProfileStatus status={this.state.status} />
                                    )}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </>
            ) : (
                <div className={classes.content2}>
                    <div>
                        {this.state.profile === null ? (
                            <>
                                <div>
                                    <div className={classes.parallax}>
                                        <Skeleton animation="wave" className={classes.skeleton} alt="profile" />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <StaticProfile profile={this.state.profile}/>
                        )}
                    </div>
                    <Grid container className={classes.grid}>
                        <Grid item className={classes.gridItem} sm={8} xs={12} >
                            { screamMarkup }
                        </Grid>
                        <Grid item className={classes.gridItem} sm={4} xs={12}>
                            {this.state.status === null ? (
                                <Paper className={`stickyPaper ${classes.paper}`}>
                                    <div className={classes.profile}>
                                        <div className="image-wrapper">
                                                <Skeleton animation="wave" alt="profile" variant="circle" width={132} height={132} className="profile-image" />
                                        </div>
                                    </div>
                                </Paper>
                            ) : (
                                <ProfileStatus status={this.state.status} />
                            )}
                        </Grid>
                    </Grid>
                </div>
            )}
            </Fragment>
        );
    }
}

User.propTypes = {
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired,
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data,
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { getUserData })(withStyles(styles)(User))