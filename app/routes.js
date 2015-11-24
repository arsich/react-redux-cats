import React from 'react';
import {IndexRoute, Route, Router} from 'react-router';
import App from './containers/App';
import FinderPage from './containers/FinderPage';
import ViewerPage from './containers/ViewerPage';

export default (
    <Router>
            <Route path="/" component={App}>
                <IndexRoute component={FinderPage} />
                <Route path="viewer" component={ViewerPage} />
            </Route>
    </Router>
);