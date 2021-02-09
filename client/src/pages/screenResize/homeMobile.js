import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types'
// Mui
import { withStyles, Grid } from '@material-ui/core';
// Redux
import { connect } from 'react-redux';
import { getScreams } from '../../redux/action/dataAction'
// Component
import Scream from '../../components/scream/Scream';
import ScreamSkeleton from '../../util/ScreamSkeleton';

// const drawerWidth = 240;

const styles = (theme) => ({
    home: {
        marginTop: '50px',
        position: 'relative',
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
    },
    home2: {
        marginTop: '60px',
        position: 'relative',
        backgroundColor: theme.palette.secondary.notAuth,
        height: '100%',
    },
    content: {
        // width: `calc(100% - ${drawerWidth}px)`,
        // marginLeft: drawerWidth,
        backgroundColor: theme.palette.secondary.light,
        height: '100%',
        position: 'relative'
    },
    content2: {
        backgroundColor: theme.palette.secondary.notAuth,
        height: '100%',
        position: 'relative'
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
                <div className={`stickyPaper ${classes.content}`}>
                    <Grid className={`stickyPaper ${classes.home}`} container>
                        <Grid item sm={12} xs={12}>
                            {recentScreamsMarkup}
                        </Grid>
                    </Grid>
                </div>
            ) : (
                <div className={`stickyPaper ${classes.content2}`}>
                    <Grid className={`stickyPaper ${classes.home2}`} container>
                        <Grid item sm={12} xs={12}>
                            {recentScreamsMarkup}
                        </Grid>
                    </Grid>
                </div>
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