import React from 'react';
import PropTypes from "prop-types";

const Componente = ({open, onClose, ativo, onReload}) => {

    return(
        <>
        </>
    );
};

Componente.propType = {
    ativo: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
    onReload: PropTypes.func,
};

Componente.defaultProps = {
    ativo: {},
    open: false,
    onClose: () => {},
    onReload: () => {},
};

export default Componente;
