import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
// Redux stuff
import { connect } from 'react-redux';
// layout
import AuthME from './AuthME';
import NotAuthNav from './NotAuthNav';



class Navbar extends Component {
    render() {
        const { authenticated } = this.props
        return (
            <Fragment>
                {authenticated ? <AuthME /> : <NotAuthNav />  }
            </Fragment>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar)