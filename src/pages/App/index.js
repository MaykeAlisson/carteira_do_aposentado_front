import React from "react";

import {AppProvider} from 'Contexts/contexto';
import BarraNavegacao from './componentes/BarraNavegacao'
import {Container, CssBaseline} from "@mui/material";
import PropTypes from "prop-types";

import Routes from '../../routes'

const Page = ({onLogout}) => {

    return (
        <AppProvider>
            <BarraNavegacao onLogoutSuccess={() => onLogout()}/>
            <CssBaseline/>
            <Container>
                <Routes/>
            </Container>
        </AppProvider>
    );
};

Page.propTypes = {
    onLogout: PropTypes.func,
};

Page.defaultProps = {
    onLogout: () => {},
};

export default Page;
