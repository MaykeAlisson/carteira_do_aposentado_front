import React from 'react';
import {Button, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {ExitToApp} from "@mui/icons-material";

import IconPing from '../../../../../../public/img/icon_ping.png';

const Componente = ({userName, onLogoutSuccess}) => {
    return (
        <>
            <div style={{textAlign: 'center'}}>
                <img
                    src={IconPing}
                    alt="logo app"
                    style={{width: 80, textAlign: 'center'}}
                />
            </div>
            <Typography style={{padding: 10, textAlign: "center", fontWeight: 'bold'}}>
                Bem Vindo {userName} !</Typography>
            <Button
                onClick={onLogoutSuccess}
            >
                <ExitToApp fontSize="small" style={{width: '0.8em'}}/>
                <Typography variant="inherit">Sair</Typography>
            </Button>
        </>
    );
};

Componente.propType = {
    userName: PropTypes.string,
    onAcessSuccess: PropTypes.func
};

Componente.defaultProps = {
    userName: '',
    onAcessSuccess: () => {
    }
};

export default Componente;
