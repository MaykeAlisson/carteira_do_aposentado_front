import React from 'react';
import {Route, Routes} from 'react-router-dom';

import Painel from './pages/App/componentes/Painel'
import Ativo from './pages/App/componentes/Ativo'
import Carteira from './pages/App/componentes/Carteira'
import Lancamento from './pages/App/componentes/Lancamento'
import Fundamento from './pages/App/componentes/Ativo/components/Fundamento'

export default () => (
    <Routes>
        <Route path='/' exact element={<Painel/>}/>
        <Route path='/ativo' exact element={<Ativo/>}/>
        <Route path='/ativo/fundamento' exact element={<Fundamento/>}/>
        <Route path='/lancamento' exact element={<Lancamento/>}/>
        <Route path='/carteira' exact element={<Carteira/>}/>
        <Route path='/*' element={<Painel/>}/>
    </Routes>
);
