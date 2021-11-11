import React from "react";

import {AppProvider} from 'Contexts/contexto';
import BarraNavegacao from './componentes/BarraNavegacao'
import {Container, CssBaseline} from "@mui/material";

import Routes from '../../routes'

const Page = () => {

    return (
        <AppProvider>
            <BarraNavegacao/>
            <CssBaseline/>
            <Container>
                <Routes/>
            </Container>
        </AppProvider>
    );
};

export default Page;
