import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Painel from './pages/App/componentes/Painel'

export default () => (
    <Routes>
        <Route path='/' exact element={<Painel/>}/>
    </Routes>
);
