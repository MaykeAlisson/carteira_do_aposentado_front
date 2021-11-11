import React from "react";

import {AppProvider} from 'Contexts/contexto';
import BarraNavegacao from './componentes/BarraNavegacao'
import Routes from '../../routes';
import styled from "@emotion/styled";

const Page = () => {

    return (
        <AppProvider>
            <BarraNavegacao/>
            <Container>
                <Routes/>
            </Container>
        </AppProvider>
    );

};

const Container = styled.div`
  padding-top: 50px;
  background-color: red;
  padding-bottom: 50px;
`;

export default Page;
