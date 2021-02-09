import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Paper} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import withStyles from '@material-ui/core/styles/withStyles'

const styles = (theme) => ({
    paper: {
        boxShadow: 'none',
        maxWidth: 345,
        margin: theme.spacing(4),
        position:'sticky',
        top: 140,
        padding:20,
        zIndex: '1',
        backgroundColor: theme.palette.secondary.light
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
})

const ProfileSkeleton = (props) => {
    const { classes } = props;
    return (
        <Fragment>
            <Paper className={`stickyPaper ${classes.paper}`}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                            <Skeleton animation="wave" alt="profile" variant="circle" width={132} height={132} className="profile-image" />
                    </div>
                </div>
            </Paper>
        </Fragment>
    )
}

ProfileSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}


export default withStyles(styles)(ProfileSkeleton)



