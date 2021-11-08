import React from 'react';
import {Switch} from 'react-router-dom';
import {Route} from 'react-router-dom';

import Home from './pages/Home'


export default () => (

        <Switch>
            <Route path='/' exact component={Home} />
        </Switch>


)
