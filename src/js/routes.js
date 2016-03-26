import React from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import App from './components/app';
import Home from './components/pages/home';
import NotFoundPage from './components/pages/notFound';

const routes = (
    <Router  history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="*" component={NotFoundPage} />
        </Route>
    </Router>
);

export default routes;