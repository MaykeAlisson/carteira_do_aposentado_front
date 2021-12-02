import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Painel from './pages/App/componentes/Painel'
import Ativo from './pages/App/componentes/Ativo'
import Fundamento from './pages/App/componentes/Ativo/components/Fundamento'

export default () => (
    <Routes>
        <Route path='/' exact element={<Painel/>}/>
        <Route path='/ativo' exact element={<Ativo/>}/>
        <Route path='/ativo/fundamento' exact element={<Fundamento/>}/>
        <Route path='/*' element={<Painel/>}/>
    </Routes>
);
