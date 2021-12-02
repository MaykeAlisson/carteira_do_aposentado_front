import React from "react";
import {Dialog, Typography} from "@mui/material";
import PropTypes from "prop-types";

const Componente = ({openObs, onCloseObs, text}) => {

    return(
        <Dialog onClose={() => {onCloseObs()}} open={openObs}>
            <div style={{whiteSpace: 'normal', maxWidth: 250}}>
                <p style={{margin: 5}}>
                    {text}
                </p>
            </div>
        </Dialog>
    );
};

Componente.propType = {
    openObs: PropTypes.bool,
    onCloseObs: PropTypes.func,
    text: PropTypes.string,
};

Componente.defaultProps = {
    openObs: false,
    onCloseObs: () => {},
    text: '',
};

export default Componente;
