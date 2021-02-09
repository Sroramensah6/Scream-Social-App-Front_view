import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, Typography } from '@material-ui/core';
import jwtDecode from 'jwt-decode';
import axios from 'axios'
// Util
import darkTheme from './util/darkTheme';
import themeApp from './util/themes';
import AuthRoute from './util/AuthRoute';
// Components
import Navbar from './components/layout/Navbar'
// Pages
import user from './pages/user';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
// import profile from './pages/Profile';
// notistack
import { SnackbarProvider } from 'notistack';
// Redux
import { connect } from 'react-redux'
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/action/userAction';
import { darkModeAction } from './redux/action/themeModeAction';

const theme = createMuiTheme(themeApp);
const darkThemes = createMuiTheme(darkTheme);

axios.defaults.baseURL = 'https://us-central1-tinasrora.cloudfunctions.net/api';

const mode = localStorage.darkMode
if(!mode){
    store.dispatch(darkModeAction(window.localStorage.getItem('theme')))
}

const token = localStorage.FBIdToken;

if (token) {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp *3000 < Date.now()) {
        store.dispatch(logoutUser());
        window.location.href = '/login';
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common['Authorization'] = token
        store.dispatch(getUserData());
    }
}

class App extends Component {
    render() {
        const { tM :{
            darkMode
        } } = this.props
        console.log(darkMode)
        return (
            <MuiThemeProvider theme={ darkMode !== 'dark' ? darkThemes : theme }>
                <SnackbarProvider maxSnack={3}>
                    <Typography component="div" className="container">
                        <Router>
                            <Navbar />
                            <Switch>
                                <Route exact path='/' component={home} />
                                <AuthRoute exact path='/login' component={login} />
                                <AuthRoute exact path='/signup' component={signup} />
                                <Route exact path='/users/:handle' component={user} />
                                <Route exact path='/users/:handle/scream/:screamId' component={user} />
                            </Switch>
                        </Router>
                    </Typography>
                </SnackbarProvider>
            </MuiThemeProvider>
        )
    }
}

const mapStateToProps = (state) => ({
    tM: state.tM,
});

export default connect(mapStateToProps)(App);