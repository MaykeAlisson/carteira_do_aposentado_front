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
            </Container
            >
            {/*<Container>*/}
            {/*    <Routes/>*/}
            {/*</Container>*/}
        </AppProvider>
    );

};

// const Container = styled.div`
//   padding-top: 50px;
//   background-color: red;
//   padding-bottom: 50px;
// `;

export default Page;
