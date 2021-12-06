import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

import AppContext from "Contexts/contexto";

const Componente = () => {

    const {ativoFundamento} = useContext(AppContext);

    const [ativo, setAtivo] = useState({...ativoFundamento});

    useEffect(() => {
        setAtivo({...ativoFundamento})
    }, [ativoFundamento])
    
    return(
        <>
            <Button
                size="small"
                variant="contained"
                color="primary"
                style={{
                    textDecoration: 'none',
                    marginLeft: '20px',
                }}
                component={Link}
                to={{
                    pathname: '/ativo',
                    state: { prevPath: '/ativo/fundamento' },
                }}
            >
                VOLTAR
            </Button>
            <h1>Fundamentos</h1>
        </>
    )
};

// Componente.propType = {
//     ativo: PropTypes.object,
//     onReload: PropTypes.func,
// };
//
// Componente.defaultProps = {
//     ativo: {},
//     onReload: () => {},
// };

export default Componente;
