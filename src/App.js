import React from 'react';
import {Switch, Redirect, Route} from 'react-router-dom';
import PrivateRoute from './hoc/PrivateRoute/PrivateRoute';
import {Helmet} from 'react-helmet';
import {connect} from 'react-redux';
import './assets/style/style.scss';
import MainPage from './components/MainPage/MainPage';
import Auth from './components/Auth/Auth';
import ReactNotification from 'react-notifications-component';

class App extends React.Component {
    render() {
        return (
            <>
                <Helmet>
                    <title>{this.props.common.pageTitle}</title>
                </Helmet>
                <ReactNotification />
                <Switch>
                    <PrivateRoute path={`/auth`} exact component={Auth} condition={!!this.props.authState.userToken === false} redirect={`/`}></PrivateRoute>
                    <PrivateRoute path={`/`} exact component={MainPage} condition={!!this.props.authState.userToken === true} redirect={`/auth`}></PrivateRoute>
                    <Redirect to={`/`}></Redirect>
                </Switch>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        common: state.common,
        authState: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
