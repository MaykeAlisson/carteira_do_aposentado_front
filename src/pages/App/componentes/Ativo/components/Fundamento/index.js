import React from "react";
import PropTypes from "prop-types";

const Componente = ({ativo, onReload}) => {

    return(
        <>
            <h1>Fundamentos</h1>
        </>
    )
};

Componente.propType = {
    ativo: PropTypes.object,
    onReload: PropTypes.func,
};

Componente.defaultProps = {
    ativo: {},
    onReload: () => {},
};

export default Componente;
