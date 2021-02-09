import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import MyButton from '../../util/myButton'
import PropTypes from 'prop-types'
// MUI stuff
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { withStyles } from '@material-ui/core';
// Redux
import { likeScream, unlikeScream } from '../../redux/action/dataAction'
import { connect } from 'react-redux';
const styles = (theme) =>({
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    cardText: {
        color: theme.palette.primary.main
    },
    cardText2: {
        color: theme.palette.primary.notAuthB
    }
})
class LikeButton extends Component {
    likedScream = () => {
        if (this.props.user.likes &&
            this.props.user.likes.find(
                (like) => like.screamId === this.props.screamId
            )
        )
            return true
        else return false;
    }
    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    }
    render() {
        const { classes } = this.props
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton arialabel="like" tip="like">
                    <FavoriteBorder className={classes.cardText2} />
                </MyButton>
            </Link>
        ) : (
            this.likedScream() ? (
                <MyButton arialabel="unlike" tip="Undo like" onClick={this.unlikeScream}>
                    <FavoriteIcon color="secondary" />
                </MyButton>
            ) : (
                <MyButton arialabel="like" tip="like" onClick={this.likeScream}>
                    <FavoriteBorder className={classes.cardText} />
                </MyButton>
            )
        )
        return  likeButton
    }
}
LikeButton.propTypes ={
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    screamId: PropTypes.object.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(LikeButton))